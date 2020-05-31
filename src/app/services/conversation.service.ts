import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  Observable
} from 'rxjs/Observable';
import {
  of
} from 'rxjs/observable/of';
import {
  catchError,
  map,
  tap
} from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ChatService } from './chat.service';
import { UserService } from './user.service';
import { ChatUser } from './../interfaces/chat-user';
import { Paginated } from './../interfaces/paginated';
import { ConversationMessage } from './../interfaces/conversation-message';
import { ChatMessageOutgoing } from './../interfaces/chat-message-outgoing';
import { ChatMessageIncoming } from './../interfaces/chat-message-incoming';
import { ChatMessageError } from './../interfaces/chat-message-error';
import { User } from './../interfaces/user';
import { environment } from './../../environments/environment';


const defaultConversationData: Paginated = {
  docs: [],
  limit: 0,
  page: 0,
  pages: 0,
  total: 0
};

const defaultSearchData = {
  hits: {
    hits: []
  }
};

@Injectable()
export class ConversationService {
  private apiUrl = environment.apiUrl;
  public conversations: Paginated;
  public userId: string;
  public currentChatPartner: ChatUser;
  private socket: ChatService;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService
  ) {

  }

  initSocket = () => {
    this.socket = new ChatService(this.authService.token);
  }

  /**
   * get conversations
   *
   * @returns http response value
   * @memberof ConversationService
   */
  get(lastId?: string) {
    let url = `${this.apiUrl}conversations`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };

    if (lastId) {
      url += '?lt_id=' + lastId;
    }

    return this.http.get(url, httpOptions)
      .pipe(
        tap((res: Paginated) => {
          this.conversations = res;
          return res;
        }),
        catchError((err: any) => {

          if (err.error && err.error && err.error.message === 'No conversation found') {
            return Observable.of(defaultConversationData);

          }
          else return Observable.throw({ status: err.status, ...err.error })
        })
      );
  }

  /**
   * get conversation messages
   *
   * @param conversationId: string
   * @param messageId?: string
   * @returns http response value
   * @memberof ConversationService
   */
  getMessages(conversationId: string, messageId?: string) {
    const url = `${this.apiUrl}conversation/${conversationId}/messages${messageId ? ('?lt_id=' + messageId) : ''}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };

    return this.http.get(url, httpOptions)
      .pipe(
        tap((res: Paginated) => {
          return res;
        }),
        catchError((err: any) => {
          return Observable.throw({ status: err.status, ...err.error })
        })
      );
  }

  /**
   * send start conversation websocket message
   *
   * @param userId: string
   * @memberof ConversationService
   */
  sendStartConversationMessage(userId: string) {

    let data = { "users": [this.userService.user_data._id, userId] };
    this.socket.emit("start_conversation", data);
  }

  /**
   * send chat message
   *
   * @param messageBody: ChatMessageOutgoing
   * @memberof ConversationService
   */
  sendChatMessage = (messageBody: ChatMessageOutgoing) => {
    this.socket.emit("message", messageBody)
  }

  /**
   * add start conversation event listener
   *
   * @memberof ConversationService
   */
  addStartConversationListener() {
    return this.socket
       .fromEvent<ConversationMessage>("start_conversation")
       .map(data => data);
  }

  /**
   * add chat message event listener
   *
   * @memberof ConversationService
   */
  addMessageListener() {
    return this.socket
       .fromEvent<ChatMessageIncoming>("message")
       .map(data => data);
  }

  /**
   * add chat message error event listener
   *
   * @memberof ConversationService
   */
  addMessageErrorListener() {
    return this.socket
      .fromEvent<ChatMessageError>("message_error")
      .map(data => data)
  }

  /**
   * get scrollbar width
   *
   * @memberof ConversationService
   */
  getScrollbarWidth() {
      var outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.width = "100px";
      outer.style.msOverflowStyle = "scrollbar";

      document.body.appendChild(outer);

      var widthNoScroll = outer.offsetWidth;
      // force scrollbars
      outer.style.overflow = "scroll";

      // add innerdiv
      var inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);

      var widthWithScroll = inner.offsetWidth;

      // remove divs
      outer.parentNode.removeChild(outer);

      return widthNoScroll - widthWithScroll;
  }

  /**
   * get user by id for starting chat
   *
   * @memberof ConversationService
   */
  getUserById(id: string) {
    const url = `${this.apiUrl}user?userId=${id}`;
    return this.http.get(url).pipe(
      map((res: { user: User }) => {
        let chatUserData = {
          userId: res.user._id,
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          profilePic: res.user.profilePic
        };
        return chatUserData;
      })
    );
  }

  /**
   * get services for send service
   *
   * @memberof ConversationService
   */
   getServices(docId?: string) {
     const url = `${this.apiUrl}services`;
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${this.authService.token}`
       })
     };

     // const reqUrl = `${url}?page=send_service${docId ? '&lastDocId=' + docId : ''}`;
     const reqUrl = `${url}${docId ? '?page=send_service&lt_id=' + docId : ''}`;
     return this.http.get(reqUrl, httpOptions)
       .pipe(
         tap((res: Paginated) => {
           console.log('Get services', res);
           return res;
         }),
         catchError((err: any) => {
           return Observable.of(defaultConversationData);
         })
       );
   }

   /**
    * search services to send
    *
    * @memberof ConversationService
    */
    searchServices(search, from?: number) {
      const url = `${this.apiUrl}services/search`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.token}`
        })
      };

      const reqUrl = `${url}?q=${search}&size=10${from ? '&from=' + from : ''}`;
      return this.http.get(reqUrl, httpOptions)
        .pipe(
          tap((res: Paginated) => {
            console.log('Search services', res);
            return res;
          }),
          catchError((err: any) => {
            return Observable.throw({ status: err.status, ...err.error })
          })
        );
    }

    /**
     * send service
     *
     * @memberof ConversationService
     */
     sendService(data) {
       const url = `${this.apiUrl}send-service`;
       const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${this.authService.token}`
         })
       };
       return this.http.post(url, data, httpOptions)
         .pipe(
           tap((res: Paginated) => {
             console.log('Send service', res);
             return res;
           }),
           catchError((err: any) => {
             return Observable.throw({ status: err.status, ...err.error })
           })
         );
     }

     /**
      * create/update custom offer
      *
      * @memberof ConversationService
      */
      updateCustomOffer(data, offerId: string) {
        const url = `${this.apiUrl}offer`;
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authService.token}`
          })
        };
        if (!offerId) {
          return this.http.post(url, data, httpOptions)
            .pipe(
              tap((res: Paginated) => {
                console.log('Create custom offer', res);
                return res;
              }),
              catchError((err: any) => {
                return Observable.throw({ status: err.status, ...err.error })
              })
            );
        } else {
          return this.http.put(url + `/${offerId}`, data, httpOptions)
            .pipe(
              tap((res: Paginated) => {
                console.log('Create custom offer', res);
                return res;
              }),
              catchError((err: any) => {
                return Observable.throw({ status: err.status, ...err.error })
              })
            );
        }
      }


      /**
       * delete custom offer
       *
       * @memberof ConversationService
       */
       deleteCustomOffer(offerId: string) {
         const url = `${this.apiUrl}offer/${offerId}`;
         const httpOptions = {
           headers: new HttpHeaders({
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${this.authService.token}`
           })
         };
         return this.http.delete(url, httpOptions)
           .pipe(
             tap((res: Paginated) => {
               console.log('Delete custom offer', res);
               return res;
             }),
             catchError((err: any) => {
               return Observable.throw({ status: err.status, ...err.error })
             })
           );
       }

       /**
        * get custom offer
        *
        * @memberof ConversationService
        */
        getCustomOffer(offerId: string) {
          const url = `${this.apiUrl}offer/${offerId}`;
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.authService.token}`
            })
          };
          return this.http.get(url, httpOptions)
            .pipe(
              tap((res: Paginated) => {
                console.log('Get custom offer', res);
                return res;
              }),
              catchError((err: any) => {
                return Observable.throw({ status: err.status, ...err.error })
              })
            );
        }

        /**
        * search conversations
        *
        * @memberof ConversationService
        */
        searchConversations(query: string, from?: number) {
          const url = `${this.apiUrl}conversations/search?q=${query}&size=10${ from ? '&from=' + from : ''}`;
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.authService.token}`
            })
          };
          return this.http.get(url, httpOptions)
            .pipe(
              tap((res: Paginated) => {
                console.log('Search conversations', res);
                return res;
              }),
              catchError((err: any) => {
                return Observable.of(Object.assign({}, defaultSearchData));
              })
            );
        }

        sendCustomOffer(data, id:string) {
          const url = `${this.apiUrl}request/${id}/offer`;
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.authService.token}`
            })
          };

        return this.http.post(url, data, httpOptions)
          .pipe(
            tap((res: Paginated) => {
              console.log('Send custom offer', res);
              return res;
            }),
            catchError((err: any) => {
              return Observable.of({});
            })
          );
        }
}
