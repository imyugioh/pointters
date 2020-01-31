import { Component, OnInit, NgZone, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import turf from '@turf/distance';
import { DateTime } from 'luxon';


import { OfferService } from '../../../../services/offer.service';
import { AuthService } from '../../../../services/auth.service';
import { Offer } from '../../../../interfaces/offer';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../interfaces/user';

import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { OfferDetailComponent } from '../../offer-detail/offer-detail.component';

const lineLimit = 35;

@Component({
  selector: 'app-sell-offers',
  templateUrl: './sell-offers.component.html',
  styleUrls: ['./sell-offers.component.css']
})
export class SellOffersComponent implements OnInit {


  public offers: Offer[];
  public user: User;

  private lastDocId: Number;
  public page: Number;
  public maxPage: Number;

  public DateTime = DateTime;
  public turf = turf;

  // scroll handler
  @ViewChild("scroll", { read: ElementRef })
  private scrollEl: ElementRef;
  public fetching = false;


  constructor(private userService: UserService,
    private offerService: OfferService,
    private modalService: NgbModal) {


    userService.get().subscribe(res => {
      this.user = res.user;
    })

    this.page = 0;
    this.maxPage = 1;


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

    if ((this.page >= this.maxPage) || this.fetching) {
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

  getOfferDescriptionTitle(text) {
    if (!text) return '';
    if (text.length < lineLimit) return text;


    let textArr = text.split(' ');
    let filledText = '';
    for (let i = 0; i < textArr.length; i++) {
      if (filledText.length < lineLimit && filledText.length + textArr[i].length < lineLimit) {
          filledText += textArr[i] + ' ';
      } else break;
    }

    // console.log('title text', text, filledText)
    return filledText;
  }

  getOfferDescriptionBody(text) {
    if (!text) return '';
    if (text.length < lineLimit) return '';

    let textArr = text.split(' ');
    let filledText = '';
    for (let i = 0; i < textArr.length; i++) {
      if (filledText.length < lineLimit && filledText.length + textArr[i].length < lineLimit) {
          filledText += textArr[i] + ' ';
      } else break;
    }

    let wrappedText = text.substr(filledText.length - 1, text.length);

    // console.log('wrapped text', text, wrappedText)
    return wrappedText;
  }

  fetchOffers() {
    if ((this.page >= this.maxPage) || this.fetching) {
      return Observable.empty();
    }

    this.fetching = true;

    const filter = this.lastDocId && {
      lt_id: this.lastDocId,
    };



    return this.offerService.getSent(filter)
      .map(res => {
        console.log('offers', res)
        this.lastDocId = res['lastDocId'];
        this.page = res['page'];
        this.maxPage = res['pages'];

        res['docs'].forEach((offer: Offer) => {
          offer.createdAt = DateTime.fromISO(offer.createdAt);
        });

        if(!this.offers) {
          this.offers = res['docs'];
        }
        else {
          this.offers = this.offers.concat(res['docs']);
        }

        this.fetching = false;
      }).catch(err => {
        this.page = 1;
        this.maxPage = 1;
        this.offers = [];
        this.fetching = false;
        return Observable.empty();
      });
  }

    // ui - modals
    open(idx) {
      const modalRef = this.modalService.open(OfferDetailComponent);
      modalRef.componentInstance.id = this.offers[idx]['offerId'];
    }

}
