import { Component, OnInit, EventEmitter, Input, Output, OnChanges, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { User } from './../../interfaces/user';

@Component({
  selector: 'live-offers-slider',
  templateUrl: './explore-live-offers-slider.component.html',
  styleUrls: ['./explore-live-offers.component.css']
})
export class LiveOffersSliderComponent implements OnInit {

  @Input() slides: Array<any>;
  @Input() loadMore: Function;
  @Input() slidesPerView: number = 3;
  @Input() extView: boolean = false;
  @Input() user: User;

  @ViewChild('swiper') swiper: SwiperDirective;

  private config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: this.slidesPerView,
    navigation: true
  }

  ngOnInit() {
    this.config.slidesPerView = this.slidesPerView;
  }

  ngOnChanges(changes) {
    if (changes.slides && changes.slides.currentValue !== changes.slides.previousValue) {
      this.swiper.update();
    }
  }

  trackByFn(index, item) {
    return item.id;
  }

  onEndReached() {
    this.loadMore();
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
