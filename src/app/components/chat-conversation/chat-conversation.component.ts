import { Component, Input } from '@angular/core';
var moment = require('moment');

@Component({
  selector: 'chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.css']
})
export class ChatConversationComponent {
  private moment: any = moment;
	@Input() item: any;
  @Input('userId') userId: string;
  @Input('dropdownMode') dropdownMode: boolean;
  @Input('startConversation') startConversation: any;
  @Input('isActiveConversation') isActiveConversation: boolean = false;
  @Input() last: boolean;
  
  private imageError: boolean = false;

  handleImageError = () => {
    this.imageError = true;
  }
}
