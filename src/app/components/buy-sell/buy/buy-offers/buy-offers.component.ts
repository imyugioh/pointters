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
import { AuthService } from "../../../../services/auth.service";
import { Offer } from "../../../../interfaces/offer";
import { UserService } from "../../../../services/user.service";
import { User } from "../../../../interfaces/user";

import * as $ from "jquery";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap/modal/modal";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap/modal/modal-dismiss-reasons";
import { OfferDetailComponent } from "../../offer-detail/offer-detail.component";

@Component({
  selector: "app-buy-offers",
  templateUrl: "./buy-offers.component.html",
  styleUrls: ["./buy-offers.component.css"]
})
export class BuyOffersComponent implements OnInit, AfterViewInit {
  public offers: any[] = [];
  public user: User;

  private lastDocId: Number;
  public page: Number;
  public maxPage: Number;

  public DateTime = DateTime;
  public turf = turf;

  private closeResult: string;

  // scroll handler
  @ViewChild("scroll", { read: ElementRef })
  private scrollEl: ElementRef;
  public fetching = false;

  constructor(
    private userService: UserService,
    private offerService: OfferService,
    private modalService: NgbModal
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

  ngAfterViewInit() {}

  @HostListener("window:scroll", [])
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

    let filter = this.lastDocId && {
      lt_id: this.lastDocId
    };

    return this.offerService
      .getReceived(filter)
      .map(res => {
        this.lastDocId = res["lastDocId"];
        this.page = res["page"];
        this.maxPage = res["pages"];

        res["docs"].forEach((offer: Offer) => {
          offer.createdAt = DateTime.fromISO(offer.createdAt);
        });

        if(!this.offers) {
          this.offers = res['docs'];
        }
        else {
          this.offers = this.offers.concat(res['docs']);
        }
        
        this.fetching = false;
      })
      .catch(err => {
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
    modalRef.componentInstance.id = this.offers[idx]["offerId"];
  }
}
