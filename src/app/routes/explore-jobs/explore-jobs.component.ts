import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ExploreJobsService } from './../../services/explore-jobs.service';
import { UserService } from './../../services/user.service';
import { ServiceService } from './../../services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { JobDetailModalComponent } from '../../components/buy-sell/job-detail/job-detail.component';

import { GoogleMapsAPIWrapper, LatLngBounds } from '@agm/core';

import { Paginated } from './../../interfaces/paginated';
import { User } from './../../interfaces/user';

import mapStyle from './../../interfaces/map-style';

var moment = require('moment');
const defaultZoom = 9;

declare var google: any

@Component({
  selector: 'app-explore-jobs',
  templateUrl: './explore-jobs.component.html',
  styleUrls: ['./explore-jobs.component.css']
})

export class ExploreJobsComponent implements OnInit {

  private $: any = window['$'];
  private fetching: boolean = true;
  private data: any;
  private currentPage: number = 1;
  private moment: any = moment;
  private user: User;
  private markers: any = []; // map markers from search by location
  private mapInit: boolean = false;
  private scrollHeight: any = 0;
  private scrollbarWidth: number = 0;
  private infiniteScrollDisabled: boolean = false;

  private searchMode: boolean = false;

  private categories: any = [];
  private selectedCategoryId: string = 'ALL';

  private lat: number;
  private lng: number;
  private bounds: LatLngBounds;

  private zoom: number = defaultZoom;
  private map: any;
  private updatingMap: boolean = false;
  private customMarkers: Array<any>;
  private selectedItem: any;
  private selectedItemGroup: any;
  private notFound: boolean = true;
  public overlays: object = {};

  private mapStyle: any = mapStyle;

  @ViewChild('map') mapView;

  constructor(
    private userService: UserService,
    private jobsService: ExploreJobsService,
    private mapHandler: GoogleMapsAPIWrapper,
    private modalService: NgbModal,
    private serviceService: ServiceService,
    private router: Router
  ) { }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }


  ngOnInit() {
    this.getJobs();
    window.addEventListener('resize', this.resizeHandler);
    this.scrollbarWidth = this.getScrollbarWidth();
    this.scrollHeight = window['innerHeight'] - this.$('.jobs-scroller').offset().top;
    this.userService.user.subscribe(data => {
      if (data) {
        this.user = data;
        let locationData = data.location.geoJson;
      //  this.lat = locationData.coordinates[0];
      //  this.lng = locationData.coordinates[1];
      }
    })
    if (this.mapView) this.mapView.triggerResize();

    this.serviceService.getCategories()
      .subscribe(res => {
        if (res['categories']) {

          let flatCategories = [];
          for (let i = 0; i < res['categories'].length; i++) {
            for (let j = 0; j < res['categories'][i]['subCategories'].length; j++) {
              res['categories'][i]['subCategories'][j]['group'] = res['categories'][i]['name'];
            }
            flatCategories = flatCategories.concat(res['categories'][i]['subCategories']);
          }

          flatCategories.unshift({ name: 'All', _id: 'ALL', group: '' });
          this.categories = flatCategories;
        }
      })
  }

  searchByCategory = (id) => {
    this.data = undefined;
    if (this.searchMode) {
      this.redoSearch(id, true);
    } else {
      this.resetSearchData(id, true);
    }
  }

  resizeHandler = () => {
    this.scrollbarWidth = this.getScrollbarWidth();
  }

  trackByIdFn(index, item) {
    return item['id'];
  }

  getScrollbarWidth() {
      var outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.width = "100px";
      outer.style.msOverflowStyle = "scrollbar";

      document.body.appendChild(outer);

      var widthNoScroll = outer.offsetWidth;
      // force scrollbars
      outer.style.overflow = "scroll";

      // add innerdiv
      var inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);

      var widthWithScroll = inner.offsetWidth;

      // remove divs
      outer.parentNode.removeChild(outer);

      return widthNoScroll - widthWithScroll;
  }

  getJobs(categoryId?: string) {
    if (this.infiniteScrollDisabled) return;
    this.fetching = true;
    // this.markers = [];

    let ctId = (categoryId && categoryId !== 'ALL') ? categoryId : null;
    this.jobsService.getJobs(this.currentPage, ctId)
    .first()
    .subscribe(data => {

      if (data && !data['docs']) {
        this.fetching = false;

        if (!this.data || !this.data.docs) {
          this.notFound = true;
          this.markers = [];
        }

        return;
      } else {
        this.notFound = false;
      }

      let newData = data;
      let newMarkerData = [];


      if (this.fetching && data) {


        if (!this.data) {
          this.data = data;
          newMarkerData = this.groupMarkerData(data['docs']);

          if (
            data['docs'][0]
            && data['docs'][0]['location']
            && data['docs'][0]['location']['geoJson']
            && (typeof this.lat === 'undefined' || typeof this.lng === 'undefined')
          ) {
              this.lat = data['docs'][0]['location']['geoJson']['coordinates'][1];
              this.lng = data['docs'][0]['location']['geoJson']['coordinates'][0];
              if (this.mapView) this.mapView.triggerResize();
              this.mapInit = true;

          }
        }
        else {
          newData['docs'] = this.data['docs'].concat(data['docs']);
          this.data = newData;
          newMarkerData = this.markers.concat(this.groupMarkerData(data['docs']));
        }

        this.markers = newMarkerData;
        this.currentPage = parseInt(data['page'], 10) + 1;
        this.fetching = false;
      }
    })
  }

  groupMarkerData = (data) => {
    let res = {};

    for (let i = 0; i < data.length; i++) {
      let el = data[i];
      if (el.location && el.location.geoJson && el.location.geoJson.coordinates) {
        let key = `${el.location.geoJson.coordinates[0]}|${el.location.geoJson.coordinates[1]}`;

        if (!res[key]) {
          res[key] = [el];

        } else {
          res[key].push(el);
        }
      }
    }
    console.log('MARKER DATA', res)
    return Object.keys(res).map(key => res[key]);

  }

  loadAPIWrapper = (map) =>  {
    this.map = map;
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

  handleMapBoundsChange = (bounds: LatLngBounds) => {
    this.bounds = bounds;
  }

  searchByLocation = (categoryId?: string) => {
    this.fetching = true;
    let bounds = this.bounds;
    if (!bounds) return;
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();

    let boundsArr = [
      [southWest.lng(), southWest.lat()],
      [northEast.lng(), northEast.lat()]
    ];

    if (this.updatingMap) return;
    this.updatingMap = true;

    let ctId = (categoryId && categoryId !== 'ALL') ? categoryId : null;
    this.jobsService.getJobsByLocation(this.formatMapBounds(boundsArr), ctId, this.currentPage)
    .first()
    .subscribe((res) => {


      if (res && !res['docs']) {
        this.fetching = false;

        if (!this.data || !this.data.docs) {
          this.notFound = true;
          this.markers = [];
        }

        this.currentPage = 1;
        return;
      }
      if (res && res['docs']) {
        this.notFound = false;
        let newMarkers = this.groupMarkerData(res['docs']);
        this.currentPage = parseInt(res['page'], 10) + 1;

        if (!this.data) {
          this.data = res;
          this.markers = newMarkers;
        } else {
          let newData = res;
          newData['docs'] = this.data.docs.concat(res['docs']);
          this.data = newData;
          this.markers = this.markers.concat(newMarkers);
        }
      }
    })

    setTimeout(() => {
      this.updatingMap = false;
      this.fetching = false;
    }, 500)

  }

  formatMapBounds(boundsObj) {
    return JSON.stringify(boundsObj);
  }

  viewJob(id) {
    const modalRef = this.modalService.open(JobDetailModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.triggerJobsUpdate = this.resetSearchData;
  }

  redoSearch(ctId?: string, fromChange?) {
    this.overlays = {};
    if (this.fetching) return;
    this.fetching = true;
    this.searchMode = true;
    this.infiniteScrollDisabled = false;
    this.selectedItemGroup = [];
    this.data = undefined;
    this.currentPage = 1;
    this.selectedItem = null;

    if (!ctId) this.selectedCategoryId = 'ALL';

    this.searchByLocation(ctId);
  }
  resetSearchData = (ctId?: string, fromChange?) => {
    if (this.fetching) return;
    this.fetching = true;
    this.searchMode = false;
    this.infiniteScrollDisabled = false;
    this.selectedItemGroup = [];
    this.data = undefined;
    this.currentPage = 1;

    if (!ctId) this.selectedCategoryId = 'ALL';

    this.getJobs(ctId);
  }

  selectItem(index) {
    this.selectedItem = index;
  }

  selectItemGroup = (data) => {
    if (this.fetching) return;
    this.data = undefined;
    this.fetching = true;

    setTimeout(() => {
      this.infiniteScrollDisabled = true;
      console.log('SELECTED GROUP', data)
      this.selectedItemGroup = data;
      this.fetching = false;
    }, 500)

  }

  addOverlayKey = (key) => {
    this.overlays[key] = true;
  }
  removeOverlayKey = (key) => {
    if (this.overlays[key]) delete this.overlays[key];
   }

}
