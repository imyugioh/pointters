import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import mapStyle from './../../interfaces/map-style';
import { UserService } from './../../services/user.service';
import { ExploreLiveOffersService } from './../../services/explore-live-offers.service';
import { RequestService } from './../../services/request.service';

import { GoogleMapsAPIWrapper, LatLngBounds } from '@agm/core';

import { Paginated } from './../../interfaces/paginated';
import { User } from './../../interfaces/user';
import { Request } from './../../interfaces/request';

var moment = require('moment');
declare var $: any;

let testData = [
    {
      label: 'test suggestion 1', value: 'test'
    },
    {
      label: 'test suggestion 2', value: 'test'
    },
    {
      label: 'test suggestion 3', value: 'test'
    },
    {
      label: 'test suggestion 4', value: 'test'
    },
    {
      label: 'test suggestion 5', value: 'test'
    }
]

@Component({
  selector: 'app-explore-live-offers',
  templateUrl: './explore-live-offers.component.html',
  styleUrls: ['./explore-live-offers.component.css']
})

export class ExploreLiveOffersComponent implements OnInit, OnChanges {

  constructor(
    private userService: UserService,
    private requestService: RequestService,
    private offersService: ExploreLiveOffersService
  ) {  }

  @Input() private requestId: string;

  private createRequestOpen: boolean = false;
  private searchHelperOpen: boolean = false;
  // private requestId: string;
  private mapStyle: any = mapStyle;
  private request: Request;
  private datePickerOpen: boolean = false;
  private timePickerOpen: boolean = false;
  private date: any = new Date();

  private recentOffers = testData;
  private recentCategories = testData;
  private searchSuggestions = testData;
  private suggestionMode: boolean = false;

  private user: User;

  private blockClickOutside: boolean = true;

  private moment: any = moment;
  private toTime: number;
  private fromTime: number;
  private timeDisplayValue: string = 'No time selected';

  private requestImageErr: boolean = false;
  private suggestedOffers: Paginated;

  private requestBody: any = {
    description: "",
    minPrice: "",
    maxPrice: "",
    location: {
      "city": "Chicago",
      "country": "US",
      "geoJson": {
          "type": "Point",
          "coordinates": [
              -73.856077,
              40.848447
          ]
      },
      "postalCode": "12345",
      "province": "Chicago",
      "state": "IL"
    },
    category: {
      id: '123',
      name: 'Home'
    },
    media: [{
       "fileName":"https://s3.amazonaws.com/pointters_dev/sample-service-images/service1.jpg",
       "mediaType":"image"
     }],
     currencyCode: '$',
     currencySymbol: 'USD',
     scheduleDate: new Date().toISOString()
  }
  // export interface Request {
  //   id: string;
  //   description: string;
  //   createdAt: string;
  //   media: Media[];
  //   numOffers: number;
  //   numNewOffers: number;
  //   low: number;
  //   high: number;
  //   expiresIn: number;
  // }

  ngOnInit() {
    this.loadSuggestedOffers();
    this.userService.user.subscribe(data => {
      if (data) {
        this.user = data;
      //  this.lat = locationData.coordinates[0];
      //  this.lng = locationData.coordinates[1];
      }
    })
  }

  ngOnChanges(changes) {
    if (changes.requestId && changes.requestId.currentValue) {
      this.requestService.get(changes.requestId.currentValue)
        .first()
        .subscribe(
          (res: Request) => {
            this.request = res;
          },
          (err) => {
            console.log('failed to fetch request by id', changes.requestId.currentValue);
          }
        )
    }
  }

  handleImageErr() {
    this.requestImageErr = true;
  }

  handleSuggestion(item) {
    this.requestBody.description = item.label;
    this.suggestionMode = false;
    this.searchHelperOpen = false;
  }

  clickOutsideSearch() {
    this.searchHelperOpen = false;
    this.suggestionMode = false;
  }

  handleRequestSearchInput(val) {
    if (val) {
      this.suggestionMode = true;
    } else {
      this.suggestionMode = false;
    }
  }

  handleSearchInputClick = () => {
    if (this.createRequestOpen) {
      this.searchHelperOpen = true;
    } else {
      this.createRequestOpen = true;
    }
  }

  toggleCreateRequest = (val: boolean) => {
    this.createRequestOpen = val;
  }

  toggleTimePicker = (val: boolean) => {
    this.timePickerOpen = val;
  }

  toggleDatePicker(val: boolean) {
    this.datePickerOpen = val;
  }

  handleTimeValueChange(type: string, val: object) {
    if (type === 'to') {
      this.toTime = val['value'];
    } else {
      this.fromTime = val['value'];
    }

    if (this.date && this.fromTime) {
      let date = moment(this.date);
      //date.startOf('date');
      date.add(this.fromTime, 'h');
      // console.log( date.utc().toISOString())
      this.requestBody.scheduleDate = date.utc().toISOString();
    }
    this.timeDisplayValue = val['allLabel'];
  }

  loadSuggestedOffers = () => {
    let page = this.suggestedOffers ? (this.suggestedOffers.page + 1) : 1;
    // console.log(page)
    this.offersService.getSuggestedOffers(page)
      .subscribe((res: Paginated) => {
        if (!this.suggestedOffers) this.suggestedOffers = res;
        else {
          if (this.suggestedOffers.lastDocId === res.lastDocId) return;
          let data = res;
          data.docs = this.suggestedOffers.docs.concat(res.docs);
          this.suggestedOffers = data;
        }

      })
  }

  createRequest() {
  //  console.log('preparing to send request');
  //  console.log(this.requestBody);

    this.requestService.createRequest(this.requestBody)
      .subscribe((res: Request) => {
        console.log('created request', res);
        this.createRequestOpen = false;
        this.request = res;
      })
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
