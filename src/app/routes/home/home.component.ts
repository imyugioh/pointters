import { Component, OnInit, NgZone, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';
import turf from '@turf/distance';
import * as $ from 'jquery';

import { ServiceService } from './../../services/service.service';
import { UserService } from './../../services/user.service';
import { User } from './../../interfaces/user';

let mockData = [
  'Test',
  'Test',
  'Test',
  'Test',
  'Test'
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public recentCategories = mockData;
  public recentSearches = mockData;

  public models: any[] = [];
  public dashboard: any;
  public upcoming: any[];

  public user: User;

  private lastDocId: number;
  public page: number;
  public limit: number = 10;
  public maxPage: number;

  public DateTime = DateTime;
  public turf = turf;

  public activeTab: number = 0;

  private liveRequestId: string;

  // scroll handler
  @ViewChild('scroll', { read: ElementRef })
  private scrollEl: ElementRef;
  public fetching = false;


  constructor(
    private serviceService: ServiceService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {

      this.userService.user.subscribe(user => {
        this.user = user;
      });
    }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // console.log('get data')
      let route = data.toString();
      if (route === 'home') {
        this.activeTab = 0;
      }
      else if (route.includes('explore,live-offers')) {

        if (data.length === 3) {
          this.liveRequestId = data[2]['path']; 
        }
        this.activeTab = 1;
      } else if (route === 'explore,jobs') {
        this.activeTab = 2;
      }
    });
    this.fetchServices().subscribe();
    this.fetchDash().subscribe();

  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.activeTab !== 0) return false;
    if ((this.page >= this.maxPage) || this.fetching) {
      return;
    }

    const element = this.scrollEl.nativeElement;

    const elementTop = $(element).offset().top;
    const elementBottom = elementTop + $(element).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    if (elementBottom > viewportTop && elementTop < viewportBottom) {
      this.fetchServices().subscribe();
    }

  }


  fetchDash() {
    return this.userService.getDash().map(res => {

      this.dashboard = res['myDashboard'];

      if (res['upcomingServices']) {
        this.upcoming = res['upcomingServices'];

        this.upcoming.forEach(service => {
          service.time = DateTime.fromISO(service.serviceScheduleDate).toLocaleString();
        });
      }

    });
  }

  fetchServices() {
    if (this.activeTab !== 0) return Observable.of({});
    // stop because there is no more pages
    if ((this.page >= this.maxPage) || this.fetching) {
      return Observable.empty();
    }

    this.fetching = true;

    return this.serviceService.getServicesExplore(this.page, this.limit)
      .map(res => {

        this.lastDocId = res['lastDocId'];
        this.page = res['page'];
        this.maxPage = res['pages'];


        this.models = this.models.concat(res['docs']);

        this.fetching = false;
      }).catch(err => {
        this.fetching = false;
        return Observable.empty();
      });
  }


}
