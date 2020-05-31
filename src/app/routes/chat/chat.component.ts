import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EmojiService } from 'angular-emojione';
import { ConversationService } from './../../services/conversation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { UserService } from './../../services/user.service';
import { As3Service } from '../../services/as3.service';
import { Paginated } from './../../interfaces/paginated';
import { ChatUser } from './../../interfaces/chat-user';
import { User } from './../../interfaces/user';
import { environment } from "./../../../environments/environment";


import { OfferDetailComponent } from '../../components/buy-sell/offer-detail/offer-detail.component';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';
// import { InfoModalComponent } from '../../components/info-modal/info-modal.component';

const uuid = require('uuid/v4');
const moment = require('moment');

declare var $: any;

const defaultMessageData: Paginated = {
  docs: [],
  limit: 0,
  page: 0,
  pages: 0,
  total: 0
};
let defaultOfferData = {
    sellerId: "",
    buyerId: "",
    description: "",
    fulfillmentMethod: {
      local: false,
      online: false,
      shipment: false,
      store: false,
      localServiceRadius: 25,
      localServiceRadiusUom: "mile"
    },
    location: null,
    price: undefined,
    currencyCode: 'USD',
    currencySymbol: '$',
    serviceId: "",
    workDuration: undefined,
    workDurationUom: { value: 'hour', label: 'Hours' },
    address: {
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
      country: "US"
    },
    parcel: {
      length: "",
      width: "",
      height: "",
      weight: ""
    }
  };

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private conversations: Paginated;
  private conversationPartner: ChatUser;
  private hasConversationPartner: boolean = false;
  private conversationId: string;
  private messages: Paginated = defaultMessageData;
  private userId: string = "";
  private moment: any = moment;
  private user: User;
  private query: string = "";
  private linkedService: any = null;

  private activeQuery:string = "";
  private searchedConversations: Paginated = Object.assign({}, defaultMessageData);
  private profileImageError: boolean = false;
  private searchMode: boolean = false;

  private activeTab: any = null;

  private shouldScrollToBottom: boolean = false;
  private scrollContentHeight: number = 0;
  private scrollOffset: number = 0;
  private scrollbarWidth: number = 0;

  private conversationScrollerStyle: any = {};
  private conversationContentStyle: any = {};
  private messageInputWrapperStyle: any = {};

  private linkServiceActive: boolean = false;
  private imageModalOpen: boolean = false;

  private noServices: boolean = false;

  public medias = [];
  private emojis = [];

  private offerToSend: any = Object.assign({}, defaultOfferData);

  @ViewChild('scroller') private scroller: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private conversationService: ConversationService,
    private userService: UserService,
    private as3Service: As3Service,
    private emojiService: EmojiService,
    private modalService: NgbModal,
    private router: Router
  ) {   }


  ngOnInit() {
    this.conversationService.initSocket();
    this.checkServiceStatus();


    // load emojione
    let self = this;
    let script = document.createElement('script');
    script.onload = function() {
      $("#emojiarea").emojioneArea({
        search: false,
        standalone: false,
        autocomplete: false,
        recentEmojis: false,
        saveEmojiAs: 'shortname',
        placeholder: 'Write a message...',
        events: {
          keydown: self.handleMessageKeydown
        }
      });
    };
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/emojionearea/3.3.1/emojionearea.min.js';
    document.head.appendChild(script);


    this.activatedRoute.params.subscribe((params) => {
      if (params && params.id) {
        this.hasConversationPartner = true;
        if (!this.conversationService.currentChatPartner) {
          this.conversationService.getUserById(params.id)
            .first()
            .subscribe(res => {
              this.startConversation(res);
            })
        } else {
          this.conversationPartner = this.conversationService.currentChatPartner;
          delete this.conversationService.currentChatPartner;
          this.startConversation(this.conversationPartner);
        }

      }
    });

    this.userService.user.subscribe(user => {
      this.user = user;

    })

    this.activatedRoute.data
      .first()
      .subscribe((data: any) => {

      this.conversations = data.conversations;
      this.scrollbarWidth = this.conversationService.getScrollbarWidth();
      this.addChatListeners();

      // apply browser specific styles to hide scrollbars
      this.conversationScrollerStyle = {
        'width': 'calc(100% + ' + this.scrollbarWidth + 'px)'
      };
      this.messageInputWrapperStyle = {
        'margin-top': -this.scrollbarWidth + 'px'
      };
    });

    this.userId = this.userService.user_data._id;
    this.scrollContentHeight = this.scroller.nativeElement.scrollHeight;

  }

  checkServiceStatus = () => {
    this.conversationService.getServices()
      .first()
      .subscribe(res => {
        if (res) {
          if (res && res.docs && res.docs.length === 0) {
            this.noServices = true;
          }
        }
      })
  }

  showCustomOffer = (offerId: string) => {
    const modalRef = this.modalService.open(OfferDetailComponent);
    modalRef.componentInstance.id = offerId;
  }

  showImageModal = (src: string) => {

    if (this.imageModalOpen) return;
    this.imageModalOpen = true;

    let img = new Image();
    let self = this;

    img.onload = function(){
        const modalRef = self.modalService.open(ImageModalComponent, { windowClass: 'image-modal' });
        modalRef.result.then(res => {
          self.imageModalOpen = false;
        })

        let style = document.createElement('style');
        let modalWidth = (this['width'] + 30) < window.innerWidth ? (this['width'] + 30) : (window.innerWidth - 30);

        style.type = 'text/css';
        let css = `.image-modal .modal-dialog { width: ${modalWidth}px; max-width: 100%; }`;
        if (style['styleSheet']){
          style['styleSheet'].cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
        style['id'] = 'modalStyle';
        document.querySelector('head').appendChild(style);

        modalRef.componentInstance.src = src;

    };

    img.src = src;

  }

  deleteLinkedService = () => {
    this.linkedService = null;
  }

  toggleLinkService = () => {
    this.linkServiceActive = !this.linkServiceActive;
  }

  handleMessageKeydown = (button, e) => {
      if (e.keyCode === 13 || e.which === 13 && this.conversationId) {
        this.sendChatMessage();
      }
  }

  handleMessageSearchChange(e) {
    //if (e.keyCode === 13 || e.which === 13 && this.query.length > 0) {
      this.searchConversations();
    //}
  }

  handleImageError() {
    this.profileImageError = true;
  }

  searchConversations() {
    if (!this.query) {
      this.activeQuery = "";
      this.searchMode = false;
      this.searchedConversations = defaultMessageData;
    } else {
      let newSearch = true;
      if (this.query !== this.activeQuery) {
        this.searchedConversations = defaultMessageData;
      }
      else newSearch = false;
      this.searchMode = true;
      this.activeQuery = this.query;
      this.getSearchedConversations(newSearch);
     }
  }

  convertToPaginated(data) {
    if (!data || data.length === 0) return [];
    return data.map(el => {
      return {
        _id: el._id,
        ...el._source
      }
    })
  }

  getSearchedConversations(newSearch: boolean = false) {
    this.conversationService.searchConversations(this.activeQuery, newSearch ? 0 : this.searchedConversations.docs.length)
      .subscribe((res: any) => {

        if (!res || !res.hits) return;
        if (this.searchedConversations.docs.length === 0 || newSearch) {
          this.searchedConversations.docs = this.convertToPaginated(res.hits.hits);
        } else {
          // let data = res;
          let docs = this.searchedConversations.docs.concat(this.convertToPaginated(res.hits.hits));
          this.searchedConversations.docs = docs;
        }
      })
  }

  loadMoreConversations() {
    if (this.searchMode && this.activeQuery) {
      this.getSearchedConversations();
    }
    else if (!this.searchMode && this.conversations && this.conversations['lastDocId']) {
      this.conversationService.get(this.conversations['lastDocId'])
      .first()
      .subscribe((res: Paginated) => {
        if (res && res.lastDocId && res.lastDocId !== this.conversations.lastDocId) {
          let data = res;
          data.docs = this.conversations.docs.concat(res.docs);
          this.conversations = data;
        }
      })
    }
  }

  trackByFn(index, item) {
    return item._id;
  }

  ngAfterViewChecked() {

    let newScrollHeight = this.scroller.nativeElement.scrollHeight;

    if (newScrollHeight > this.scrollContentHeight && !this.shouldScrollToBottom) {
      let scrollHeightDiff = newScrollHeight - this.scrollContentHeight;
      this.scrollOffset += scrollHeightDiff;
      this.scrollContentHeight = newScrollHeight;

      this.scroller.nativeElement.scrollTop = this.scrollOffset;

    } else if (this.shouldScrollToBottom) {

      this.shouldScrollToBottom = false;
      this.scrollContentHeight = newScrollHeight;
      this.scrollOffset = newScrollHeight;
      this.scroller.nativeElement.scrollTop = this.scrollOffset;
    }

  }

  // enter a chat with user
  startConversation = (userData: ChatUser) => {
    this.conversationId = "";
    this.scrollContentHeight = this.scroller.nativeElement.scrollHeight;
    this.conversationPartner = userData;
    //console.log('Conversation partner', this.conversationPartner);
    this.conversationService.sendStartConversationMessage(userData.userId || userData.id);
  }

  // navigate to url for starting conversation
  enterConversation = (user: ChatUser) => {
  this.profileImageError = false;
  this.conversationService.currentChatPartner = user;
  this.conversationPartner = user;
  this.router.navigateByUrl('/chat/' + user.userId);
}

  // send message
  sendChatMessage(media?, mediaIndex?) {
    let txt = $('#emojiarea').data("emojioneArea").getText();
    if (!this.conversationId) return;
    if (!txt && this.medias.length === 0) return;


    let messageData = {
      "conversationId": this.conversationId,
      "messageText": txt || "",
      "userId": this.conversationPartner.userId
    }
    if (this.medias) {
      messageData['media'] = media || this.medias;
    }

    this.conversationService.sendChatMessage(messageData);
    setTimeout(() => {
      if (typeof mediaIndex === 'number') this.medias.splice(mediaIndex, 1);
      else this.medias = [];
      $("#emojiarea").data("emojioneArea").setText('');
      this.getMessages();
      $('.emojionearea-button.active').trigger('click');
    }, 500);
  }

  getMessages(lastId?: string) {
    this.conversationService.getMessages(this.conversationId, lastId)
      .first()
      .subscribe(data => {
        let messages = data;

        if (lastId) {
          console.log('Fetching messages for last doc id ' + lastId + '...');
          let contentHeight = this.scroller.nativeElement.scrollHeight;

          messages.docs = data.docs.reverse().concat(this.messages.docs);
        } else {
          messages.docs = data.docs.reverse();
        }

        this.messages = messages;

          let newScrollHeight = this.scroller.nativeElement.scrollHeight;

          if (newScrollHeight > this.scrollContentHeight && lastId) {
            this.shouldScrollToBottom = false;

          } else if (!lastId) {
            this.shouldScrollToBottom = true;
          }
      })
  }

  // add chat listeners
  addChatListeners() {
    this.conversationService.addStartConversationListener()
      .subscribe(data => {
        console.log('start_conversation', data);
        if (data.conversationId && this.conversationId !== data.conversationId) {
          this.conversationId = data.conversationId;
          this.messages = defaultMessageData;
          this.getMessages();
          this.conversationService.get()
            .subscribe((data: any) => {
              this.conversations = data;
            })
        }
      })
    this.conversationService.addMessageListener()
      .subscribe(data => {
        console.log('message', data);
        this.getMessages();
      })
    this.conversationService.addMessageErrorListener()
      .subscribe(data => {
        console.log('message_error', data);
      })
  }

  // send offer in chat
  sendOffer = (offerId: string) => {
    if (!this.conversationId) return;
    let messageData = {
      "conversationId": this.conversationId,
      "offerId": offerId,
      "userId": this.conversationPartner.userId
    }
    this.conversationService.sendChatMessage(messageData);
    setTimeout(() => {
      this.getMessages();
      $('.emojionearea-button.active').trigger('click');
      this.activeTab = null;
      this.offerToSend = Object.assign({}, defaultOfferData);
      this.linkedService = null;
    }, 500);
  }

  // send service in chat
  sendService = (serviceId: string) => {
    if (!this.conversationId) return;
    let messageData = {
      "conversationId": this.conversationId,
      "serviceId": serviceId,
      "userId": this.conversationPartner.userId
    }
    this.conversationService.sendChatMessage(messageData);
    setTimeout(() => {
      this.getMessages();
      $('.emojionearea-button.active').trigger('click');
      this.activeTab = null;
    }, 500);
  }

  handleScrollUp() {
    if (this.messages.docs.length === 0) return;
    this.scrollOffset = this.scroller.nativeElement.offsetTop;
    this.getMessages(this.messages.lastDocId);
  }

  switchTab(tab) {
    this.activeTab = tab;
    // if (tab === 0) {
    //   this.getServices();
    // }
  }

  onLinkService(service) {
    this.linkedService = service;
    //console.log('SERVICE', service)
    this.toggleLinkService();
  }

  goToDefaultView = () => {
    this.switchTab(null);
  }

  onFileChange(event) {

      const files: FileList = event.target.files;

      if (files.length === 0) {
        return;
      }


      const medias = Array.from(files).map( (file, index, arr) => {

        let mediaType = 'document';
        if (file.type) {
          switch (file.type.split('/')[0]) {
            case 'image':
             mediaType = 'image';
             break;
            case 'video':
              mediaType = 'video';
              break;
            default:
              mediaType = 'document';
              break;
          }
        }

        //if (mediaType !== 'image') invalid = true; // check media type

        return {
          file: file,
          fileName: uuid() + '.' + file.name.split('.')[1], // include file extension in the name
          mediaType: mediaType,
        };
      });


      this.as3Service.uploadMedia(medias).subscribe(
        (res) => {
          this.medias = [ ...this.medias, ...medias.map( (media, index) => {
            return {
              mediaType: media.mediaType,
              fileName: res[index]['path'],
            };
          })];
          console.log('File upload done, sending message', this.medias);
        //  this.sendChatMessage();
          for (let i = 0; i < this.medias.length; i++) {
            this.sendChatMessage(this.medias[i], i);
          }
        }
      );
    }




}
