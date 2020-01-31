import {
  Component,
  OnInit,
  NgZone,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { Observable } from "rxjs";
import turf from "@turf/distance";
import { DateTime } from "luxon";

import { OfferService } from "../../../../services/offer.service";
import { AuthService } from '../../../../services/auth.service';
import { RequestService } from '../../../../services/request.service';
import { UserService } from '../../../../services/user.service';

import { Offer } from '../../../../interfaces/offer';
import { User } from '../../../../interfaces/user';
import { Request } from '../../../../interfaces/request';

import * as $ from 'jquery';

@Component({
  selector: 'app-buy-request',
  templateUrl: './buy-request.component.html',
  styleUrls: ['./buy-request.component.css']
})
export class BuyRequestComponent implements OnInit {
  public requests: Request[] = [];
  public user: User;

  private lastDocId: Number;
  public page: Number;
  public maxPage: Number;

  public DateTime = DateTime;
  public turf = turf;

  private imageLoadErr = {}

  // scroll handler
  @ViewChild('scroll', { read: ElementRef })
  private scrollEl: ElementRef;
  public fetching = false;

  constructor(
    private userService: UserService,
    private requestService: RequestService
  ) {

  }

  handleImageErr = (index) => {
    this.imageLoadErr[index] = true;
  }

  ngOnInit() {
    this.userService.user.subscribe(user => {
      this.user = user;
    });

    this.page = 0;
    this.maxPage = 1;

    this.fetchOffers().subscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.page >= this.maxPage || this.fetching) {
      return;
    }

    const element = this.scrollEl.nativeElement;

    const elementTop = $(element).offset().top;
    const elementBottom = elementTop + $(element).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    if (elementBottom > viewportTop && elementTop < viewportBottom) {
      this.fetchOffers().subscribe();
    }
  }

  fetchOffers() {
    if (this.page >= this.maxPage || this.fetching) {
      return Observable.empty();
    }

    this.fetching = true;

    const filter = this.lastDocId && {
      lt_id: this.lastDocId
    };

    return this.requestService
      .getRequests(filter)
      .map(res => {
        this.lastDocId = res['lastDocId'];
        this.page = res['page'];
        this.maxPage = res['pages'];

        const arrayLength = res['docs'].length;
        for (let i = 0; i < arrayLength; i++) {
          res['docs'][i] = res['docs'][i]['requests'];
          const request: Request = res['docs'][i];

          request.createdAt = DateTime.fromISO(
            request.createdAt
          ).toLocaleString(DateTime.DATETIME_SHORT);
        }

        if(!this.requests) {
          this.requests = res['docs'];
        }
        else {
          this.requests = this.requests.concat(res['docs']);
        }

        this.fetching = false;
      })
      .catch(err => {
        this.requests = [];
        this.fetching = false;
        this.page = 1;
        this.maxPage = 1;
        return Observable.empty();
      });
  }
}
