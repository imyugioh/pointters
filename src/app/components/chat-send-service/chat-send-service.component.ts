import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Paginated } from './../../interfaces/paginated';
import { ConversationService } from './../../services/conversation.service';

const defaultServiceData: Paginated = {
  docs: [],
  limit: 0,
  page: 0,
  pages: 0,
  total: 0
};


@Component({
  selector: 'chat-send-service',
  templateUrl: './chat-send-service.component.html',
  styleUrls: ['./chat-send-service.component.css']
})
export class ChatSendServiceComponent implements OnInit {
	@Input() scrollbarWidth: number = 0;
  @Input() user: any;
  @Input() chatPartnerId: string;
  @Input() sendServiceInChat: any;

  @Input() sendServiceMode: boolean = true;

  @Output() onLinkService: EventEmitter<{}> = new EventEmitter<{}>();

  private services: Paginated = defaultServiceData;
  private query: string;
  private searchQuery: string;
  private isSearchMode: boolean = false;


  constructor(
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    this.getServices();
  }

  triggerSearch(evt) {
    //if (evt.keyCode === 13 || evt.which === 13 && this.query) {
      if (!this.isSearchMode) {
        this.services = defaultServiceData;
        this.isSearchMode = true;
        this.searchQuery = this.query;
        this.searchServices(this.searchQuery);
      }
      else if (this.query) {
        this.services = defaultServiceData;
        this.searchQuery = this.query;
        this.searchServices(this.searchQuery);
      }
      else if (!this.query) {
        // clear search
        this.services = defaultServiceData;
        this.searchQuery = this.query;
        this.isSearchMode = false;
        this.getServices();
      }
    //}
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

  loadMoreServices() {
    if (this.isSearchMode && this.searchQuery) {
      this.searchServices(this.searchQuery);
    } else {
      this.getServices();
    }
  }

  searchServices(query: string) {
    this.conversationService.searchServices(query, this.services.docs.length)
      .subscribe(response => {
        if (response) {
          let res = this.convertToPaginated(response);
          let data = res;
          if (this.services.docs.length === 0) this.services = res;
          else {
            data.docs = this.services.docs.concat(res.docs);
            this.services = data;
          }
        }
      })
  }

  getServices() {
    let docId = null;
    if (this.services && this.services.lastDocId) docId = this.services.lastDocId;

    this.conversationService.getServices(docId)
      .first()
      .subscribe(res => {
        if (res) {
          let data = res;
          if (!docId) this.services = res;
          else {
            if (docId === res.lastDocId) return;
            data.docs = this.services.docs.concat(res.docs);
            this.services = data;
          }
        }
      });
  }

  convertToPaginated(data) :Paginated {
    return {
      docs: data.map((el) => {
         let serviceObj = { service: {} };
         let obj = serviceObj['service'];

         obj['id'] = el._id;

         if (el._source.location) obj['location'] = el._source.location;
         if (el._source.media && el._source.media[0]) obj['media'] = el._source.media[0];
         if (el._source.prices && el._source.prices[0]) obj['prices'] = el._source.prices[0];

         obj['numOrders'] = el._source.numOrders;
         obj['pointValue'] = el._source.pointValue;
         obj['fulfillmentMethod'] = el._source.fulfillmentMethod;
         obj['category'] = el._source.category;
         obj['createdAt'] = el._source.createdAt;
         obj['description'] = el._source.description;
         obj['seller'] = el._source.seller;

         return serviceObj;

      }),
      limit: 0,
      page: 0,
      pages: 0,
      total: 0
    }
  }

  sendService(serviceId: string) {
    if (!this.user || !this.chatPartnerId) return;
    let reqData = {
      fromUserId: this.user._id,
      toUserId: [this.chatPartnerId],
      serviceId: serviceId
    };
    this.conversationService.sendService(reqData).subscribe(res => {
      if (res && res.success) {
        this.sendServiceInChat(serviceId);
      }
    });
  }

  selectService(service) {
    this.onLinkService.emit(service);
  }

  trackByFn(index, item) {
    return item.service.id;
  }

}
