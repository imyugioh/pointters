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
import * as $ from 'jquery';

import { OfferService } from "../../../../services/offer.service";
import { AuthService } from '../../../../services/auth.service';
import { RequestService } from '../../../../services/request.service';
import { UserService } from '../../../../services/user.service';

import { Offer } from '../../../../interfaces/offer';
import { User } from '../../../../interfaces/user';
import { Request } from '../../../../interfaces/request';
import { JobService } from "../../../../services/job.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap/modal/modal";
import { RequestDetailModalComponent } from "../../request-detail-modal/request-detail-modal.component";

@Component({
  selector: 'app-sell-job',
  templateUrl: './sell-job.component.html',
  styleUrls: ['./sell-job.component.css']
})
export class SellJobComponent implements OnInit {

  public models: any[];
  public user: User;

  private lastDocId: Number;
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
    private jobService: JobService,
    private modalService: NgbModal,
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

    const filter = this.lastDocId && {
      lt_id: this.lastDocId
    };

    return this.jobService
      .getJobs(filter)
      .map(res => {
        this.lastDocId = res['lastDocId'];
        this.page = res['page'];
        this.maxPage = res['pages'];

        const arrayLength = res['docs'].length;

        for (let i = 0; i < arrayLength; i++) {
          res['docs'][i] = res['docs'][i]['requestOffers'];
          const request = res['docs'][i];

          request.createdAt = DateTime.fromISO(
            request.createdAt
          );

          request.sendDaysAgo = Math.abs(Math.trunc(request.createdAt.diffNow('days').days));

          request.request.createdAt = DateTime.fromISO(
            request.request.createdAt
          ).toLocaleString(DateTime.DATETIME_SHORT);
        }

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

  // ui - job modal
  open(idx) {
    const modalRef = this.modalService.open(RequestDetailModalComponent);
    modalRef.componentInstance.id = this.models[idx]['request']['requestId'];
  }
}
