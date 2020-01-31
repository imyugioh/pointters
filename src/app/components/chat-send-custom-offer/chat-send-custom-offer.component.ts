import { Component, Input, OnChanges } from '@angular/core';
import { User } from './../../interfaces/user';
import { createNumberMask } from 'text-mask-addons';
import { ConversationService } from './../../services/conversation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { ServiceAddComponent } from '../../routes/service/service-add/service-add.component';

let timeOptionsHash = {
  'week': 'Weeks',
  'hour': 'Hours',
  'day': 'Days'
}

@Component({
  selector: 'chat-send-custom-offer',
  templateUrl: './chat-send-custom-offer.component.html',
  styleUrls: ['./chat-send-custom-offer.component.css']
})
export class ChatSendCustomOfferComponent {
	@Input() item: any;
  @Input() user: User;
  @Input() goToDefaultView: any;
  @Input() toggleLinkService: any;
  @Input() linkedService: any;
  @Input() chatPartnerId: any;
  @Input() sendOffer: Function;
  @Input() service;
  @Input() noServices: boolean;
  @Input() deleteLinkedService: Function;

  private shouldValidateRealTime: boolean = false;

  private offerId: string;

  private errorMessage: string = "";
  private btnDisabled: boolean = false;
  private dropdownShown: boolean = false;
  private disableClickOutside: boolean = false;
  private priceVal = 0;

  @Input() userHasNoService: boolean;


  private priceMask = createNumberMask({
    prefix: '$'
  });
  private selectedTime = {
    value: 'week', label: 'Weeks'
  };
  private radiusMask = createNumberMask({
      prefix: '',
      suffix: ' Miles',
      allowDecimal: false,
      includeThousandsSeparator: false,
      allowNegative: false,
      integerLimit: 5
  });
  private timeOptions = [
    { value: 'week', label: 'Weeks' },
    { value: 'day', label: 'Days' },
    { value: 'hour', label: 'Hours' }
  ];

  constructor(
    private conversationService: ConversationService,
    private modalService: NgbModal
  ) {  }

  ngOnInit() {
    if (this.userHasNoService) this.btnDisabled = true;
  }

  createService() {
    const modalRef = this.modalService.open(ServiceAddComponent);
    const serviceAddComponent : ServiceAddComponent = modalRef.componentInstance as ServiceAddComponent

    serviceAddComponent.successHandler.subscribe(() => {
      modalRef.close();
      this.noServices = false;
      this.goToDefaultView();
    })
  }

  deleteCustomOffer() {
    if (this.offerId) {
      this.conversationService.deleteCustomOffer(this.offerId).subscribe(res => {
        console.log('Deleted custom offer', res);
      })
    }
    this.goToDefaultView();
  }

  validateInput = (isPriceInput?: boolean) => {

    if (isPriceInput) {
      this.priceVal = parseInt(this.service.price.substr(1), 10);
      return;
    }

    if (!this.shouldValidateRealTime) return;

    let fields = Object.keys(this.service);
    let invalid = false;
    fields.map((el, i) => {
      if (
          el === 'sellerId'
          || el === 'buyerId'
          || el === 'location'
          || el === 'currencyCode'
          || el === 'currencySymbol'
          || el === 'serviceId'
      ) return;

      // if (el === 'serviceId' && !this.service['serviceId']) {
      //     invalid = true;
      //     this.errorMessage = 'No service selected';
      //     return;
      // }


      if (el === 'parcel' && this.service.fulfillmentMethod['shipment']) {
        let parcelKeys = Object.keys(this.service['parcel']);
        parcelKeys.map(key => {
          if (!this.service['parcel'][key]) {
            invalid = true;
            this.errorMessage = 'Invalid shipping data!'
          }
        })
      }
      else if (el === 'address' && this.service.fulfillmentMethod['shipment']) {
        let addressKeys = Object.keys(this.service['address']);
        addressKeys.map(key => {
          if (!this.service['address'][key]) {
            if (key === 'street2' || key === 'phone') return;
            invalid = true;
            this.errorMessage = 'Invalid shipping address!'
          }
        })
      }

      else if (el === 'fulfillmentMethod') {
        let methodKeys = Object.keys(this.service[el]);
        let methodInvalid = true;
        methodKeys.map(key => {

          if (
            key !== 'localServiceRadius'
            && key !== 'localServiceRadiusUom'
            && key !== 'local'
          ) {
            if (this.service.fulfillmentMethod[key]) {
              methodInvalid = false;

            }
          } else if (key === 'local') {
            if (
              this.service.fulfillmentMethod[key]
              && this.service.fulfillmentMethod['localServiceRadius']) {
              methodInvalid = false
            }
          }
        })

        if (methodInvalid) {
          invalid = true;
          this.errorMessage = 'Form contains invalid data!';
        }
      }

      // if (!this.service[el]) {

        // if (el === 'address' && !this.service.fulfillmentMethod['shipment']) return;
        // if (el === 'parcel' && !this.service.fulfillmentMethod['shipment']) return;

        if (!this.service[el]) {
          invalid = true;
          this.errorMessage = 'Form contains invalid fields!'
        }
      //}

    })

    if (!invalid) {
      this.errorMessage = '';
      this.btnDisabled = false;
    } else {
      this.btnDisabled = true;
    }
  }

  showDropdown() {
    if (this.disableClickOutside) {
      this.disableClickOutside = false;
      return;
    }
    this.dropdownShown = !this.dropdownShown;
  }

  onDeliveryMethod(option: string) {
    let methodOptions = Object.keys(this.service.fulfillmentMethod);
    methodOptions.map(key => {
      if (key !== 'localServiceRadius' && key !== 'localServiceRadiusUom' && key !== option) {
        this.service.fulfillmentMethod[key] = false;
      }
    })
  }

  ngOnChanges(changes) {
    if (changes.noServices && changes.noServices.currentValue) {
      this.btnDisabled = true;
      this.errorMessage = "Please add at least one service to your profile";
    }
    if (changes.linkedService && changes.linkedService.currentValue) {

      //this.offerId = null; // clear offer id
      // console.log('LINKED SERVICE', changes.linkedService.currentValue);

      let serviceToConvert = changes.linkedService.currentValue;
      let serviceData = {};

      // serviceData['description'] = serviceToConvert.service.description;
      // serviceData['sellerId'] = this.user._id;
      // serviceData['buyerId'] = this.chatPartnerId;
      // serviceData['location'] = (serviceToConvert.service.location && serviceToConvert.service.location[0]) || {};
      // serviceData['price'] = serviceToConvert.service.prices['price'];
      //
      // if (!this.service.price) this.priceVal = serviceToConvert.service.prices['price'];
      // serviceData['serviceId'] = serviceToConvert.service.id;
      // serviceData['fulfillmentMethod'] = serviceToConvert.service.fulfillmentMethod;
      // delete serviceData['fulfillmentMethod']['_id'];
      //
      // if (!this.service['workDuration']) {
      //   serviceData['workDuration'] = serviceToConvert.service.prices['time'];
      //   serviceData['workDurationUom'] = {
      //     value: serviceToConvert.service.prices['timeUnitOfMeasure'],
      //     label: timeOptionsHash[serviceToConvert.service.prices['timeUnitOfMeasure']]
      //   };
      // }

      if (serviceToConvert.service['media'] && serviceToConvert.service['media']['_id']) {
        delete serviceToConvert.service['media']['_id'];
        serviceData['media'] = [serviceToConvert.service['media']];
      }

      this.service.serviceId = serviceToConvert.service.id;
      this.service['media'] = serviceData['media'];
      //console.log('Service data from linked service', serviceData);
      // Object.assign(this.service, serviceData);

      this.errorMessage = '';
      this.validateInput();


    }
  }

  changeLocalRadius = (type) => {
    let val = typeof this.service.fulfillmentMethod.localServiceRadius === 'string'
      ? parseInt(this.service.fulfillmentMethod.localServiceRadius.substr(0, this.service.fulfillmentMethod.localServiceRadius.length - 6), 10)
      : this.service.fulfillmentMethod.localServiceRadius

    if (type === '+') {
      this.service.fulfillmentMethod.localServiceRadius = `${val + 1} Miles`;
    } else if (val > 0){
      this.service.fulfillmentMethod.localServiceRadius = `${val - 1} Miles`;
    }
  }

  preventClick = () => {
    this.disableClickOutside = true;
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

    sendService() {
      this.shouldValidateRealTime = true;
      this.validateInput();
      if (this.btnDisabled) return;


      let serviceToSend = Object.assign({}, this.service);

      if (serviceToSend['serviceId'] === '') {
        delete serviceToSend['serviceId'];
      }

      serviceToSend['buyerId'] = this.chatPartnerId;
      serviceToSend['sellerId'] = this.user._id;
      if (!serviceToSend['location']) serviceToSend['location'] = this.user.location;

      serviceToSend['price'] = this.priceVal;

      if (typeof serviceToSend['workDurationUom'] === 'object') {
        let val = serviceToSend['workDurationUom']['value'];
        serviceToSend['workDurationUom'] = val;
      }
      if (serviceToSend['fulfillmentMethod']['shipment']) {
        if (typeof serviceToSend['address']['state'] === 'object') {
          let val = serviceToSend['address']['state']['value'];
          serviceToSend['address']['state'] = val;
        }
      } else {
        delete serviceToSend['address'];
        delete serviceToSend['parcel'];
      }

      let localRadiusVal = typeof this.service.fulfillmentMethod.localServiceRadius === 'string'
        ? parseInt(this.service.fulfillmentMethod.localServiceRadius.substr(0, this.service.fulfillmentMethod.localServiceRadius.length - 6), 10)
        : this.service.fulfillmentMethod.localServiceRadius;

      serviceToSend['fulfillmentMethod']['localServiceRadius'] = localRadiusVal;

      //console.log('SERVICE TO SEND', serviceToSend);
      let offerId = this.offerId || null;

      this.conversationService.updateCustomOffer(serviceToSend, offerId)
        .first()
        .subscribe(res => {
          if (res.success && res.offer) {
            this.offerId = res.offer._id;

            this.sendOffer(res.offer._id);
          }

          // if (res.success) {
          //
          // }
        })
    }

}
