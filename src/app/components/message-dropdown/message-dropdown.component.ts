import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paginated } from './../../interfaces/paginated';
import { UserService } from './../../services/user.service';
import { ConversationService } from './../../services/conversation.service';
import { ChatUser } from './../../interfaces/chat-user';

var moment = require('moment');

const defaultConversationData: Paginated = {
  docs: [],
  limit: 0,
  page: 0,
  pages: 0,
  total: 0
};

@Component({
  selector: 'app-message-dropdown',
  templateUrl: './message-dropdown.component.html',
  styleUrls: ['./message-dropdown.component.css']
})
export class MessageDropdownComponent implements OnInit {

  conversations: Paginated = defaultConversationData;
  scrollbarWidth: number = 0;
  moment: any = moment;

  verticalScrollOverlayStyle: any = {};
  horizontalScrollOverlayStyle: any = {};

  constructor(
    private conversationService: ConversationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getConversations();
    this.userService.user.subscribe(user => {
      if (user) {
        this.getConversations();
      }
    });
    this.scrollbarWidth = this.conversationService.getScrollbarWidth();

    // apply browser specific styles for scrollbars
    this.verticalScrollOverlayStyle = {
      'width': this.scrollbarWidth + 'px',
    };
    this.horizontalScrollOverlayStyle = {
      'margin-top': -this.scrollbarWidth + 'px'
    }
  }

  getConversations(lastId?: string) {
    this.conversationService.get()
      .subscribe((res: Paginated) => {
        if (res && res.docs) {
          this.conversations = res;
        }
      })
  }

  startConversation = (user: ChatUser) => {
    this.conversationService.currentChatPartner = user;
    this.router.navigateByUrl('/chat/' + user.userId);
  }

}
