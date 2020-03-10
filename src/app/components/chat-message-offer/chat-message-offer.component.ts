import { Component, Input } from '@angular/core';
var moment = require('moment');

@Component({
  selector: 'chat-message-offer',
  templateUrl: './chat-message-offer.component.html',
  styleUrls: ['./chat-message-offer.component.css']
})
export class ChatMessageOfferComponent {
  private moment: any = moment;
  @Input() item: any;
  @Input() chatUser: any;
  @Input() chatPartner: any;
  @Input('userId') userId: string;
  @Input() user: any;
  @Input() last: boolean;
  @Input() showOffer: Function;

  constructor() {

  }

  getDistance(coordinates1) {
    return (
      this.getDistanceFromLatLonInKm(
        coordinates1[0],
        coordinates1[1],
        this.user.location.geoJson.coordinates[0],
        this.user.location.geoJson.coordinates[1]
      ) + ' km'
    );
  }
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distace in km
    return Math.floor(d);
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

}
