import { Component, Input } from '@angular/core';
var moment = require('moment');

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  private moment: any = moment;
  @Input() item: any;
  @Input() chatUser: any;
  @Input() chatPartner: any;
  @Input('userId') userId: string;
  @Input() last: boolean;
  @Input() viewImage: Function; 

}
