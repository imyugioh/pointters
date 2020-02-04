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
import { ServiceService } from "../../../../services/service.service";
import { BuyService } from "../../../../services/buy.service";
@Component({
  selector: 'app-buy-likes',
  templateUrl: './buy-likes.component.html',
  styleUrls: ['./buy-likes.component.css']
})
export class BuyLikesComponent implements OnInit {

  public models;
  public user: User;

  private lastDocId: string;
  public page: Number;
  public maxPage: Number;

  public DateTime = DateTime;
  public turf = turf;

  // scroll handler
  @ViewChild('scroll', { read: ElementRef })
  private scrollEl: ElementRef;
  public fetching = false;

  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
  ) {

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

    const filter = this.lastDocId;

    return this.serviceService
      .getLiked(filter)
      .map(res => {
        this.lastDocId = res['lastDocId'];
        this.page = res['page'];
        this.maxPage = res['pages'];

        if(!this.models) {
          this.models = res['docs'];
        }
        else {
          this.models = this.models.concat(res['docs']);
        }

        this.fetching = false;
      })
      .catch(err => {
        this.models = [];
        this.fetching = false;
        this.page = 1;
        this.maxPage = 1;
        return Observable.empty();
      });
  }


}
