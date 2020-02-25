import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfferService } from '../../../services/offer.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { currentId } from 'async_hooks';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { createNumberMask } from 'text-mask-addons';

var moment = require('moment');

@Component({
  selector: 'app-send-offer-modal',
  templateUrl: './send-offer-modal.component.html',
  styleUrls: ['./send-offer-modal.component.css']
})
export class SendOfferModalComponent implements OnInit, OnDestroy {

  private model: any;
  private id: string;
  private user: User;
  private moment: any = moment;
  private formInvalid: boolean = false;
  private priceMask = createNumberMask({
    prefix: '$'
  });

  private shipping = {
    address: {

    },
    parcel: {

    }
  }
  private radiusMask = createNumberMask({
      prefix: '',
      suffix: ' Miles',
      allowDecimal: false,
      includeThousandsSeparator: false,
      allowNegative: false,
      integerLimit: 5
  });

  private offer = {
    buyerId: '',
    sellerId: '',
    serviceId: '5af303e4812c723037dc2ca7',
    price: undefined,
    location: {},
    media: [],
    currencyCode: '$',
    currencySymbol: 'USD',
    workDuration: '1',
    workDurationUom: 'day',
    description: '',
    fulfillmentMethod: {
      local: false,
      localServiceRadius: 25,
      localServiceRadiusUom: 'mile',
      online: false,
      shipment: false,
      store: false
    }
  }

  private selectedTime = {
    value: 'week', label: 'Weeks'
  };
  private timeOptions = [
    { value: 'week', label: 'Weeks' },
    { value: 'day', label: 'Days' },
    { value: 'hour', label: 'Hours' }
  ];

  constructor(
    private offerService: OfferService,
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private router: Router,
  ) {

   }

  ngOnInit() {
    console.log('model', this.model);
    this.offer.buyerId = this.model.userId;
    this.offer.media = this.model['media'];



    this.userService.user.subscribe(user => {
      this.user = user;
      this.offer.sellerId = user._id;
      this.offer.location = this.user.location; // TEMP use user's location

    });
    this.validateForm();

  }

  ngOnDestroy(): void {
  }

  sendOffer() {
    this.validateForm();
    if (this.formInvalid) return;
    let data = this.offer;
    if (typeof data['price'] === 'string') {
      if (data['price'][0] === '$') data['price'] = data['price'].substr(1);
      data['price'] = parseInt(data['price'].replace(/,/g, ''));
    }

    this.offerService.updateCustomOffer(data, null)
      .first()
      .subscribe(res => {
        console.log('created offer', res);
        if (res['success']) this.closeModal();
      })
  }

  closeModal() {
    this.activeModal.close();
  }

  preventClick = () => {

  }

  validateForm = () => {
    let formHasBadFields = false;
    Object.keys(this.offer).map(key => {
      if (
        key !== 'sellerId'
        && key !== 'fulfillmentMethod'
        && key !== 'buyerId'
        && key !== 'serviceId'
      ) {
          if (!this.offer[key]) formHasBadFields = true;
      }
      if (key === 'fulfillmentMethod') {
        let invalid = true;
        Object.keys(this.offer.fulfillmentMethod).map(key => {
          if (key !== 'localServiceRadius' && key !== 'localServiceRadiusUom') {
            if (key) invalid = false;
          }

        })
        if (invalid) formHasBadFields = true;
      }

    });

    if (formHasBadFields) this.formInvalid = true;
    else this.formInvalid = false;
    return this.formInvalid;
  }


  parseInt(number) {
    return parseInt(number, 10);
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
