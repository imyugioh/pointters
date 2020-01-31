import { Component, OnInit } from "@angular/core";
import { RequestService } from "../../../services/request.service";
import { UserService } from "../../../services/user.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";
import { Router } from "@angular/router";
import { User } from "../../../interfaces/user";
import { createNumberMask } from 'text-mask-addons';
import { SendOfferModalComponent } from '../send-offer-modal/send-offer-modal.component';

import { DateTime } from 'luxon';

@Component({
  selector: 'app-job-detail-modal',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailModalComponent implements OnInit {
  private model: any;
  private id: string;
  private user: User;
  private editable: boolean = false;
  private priceRange = "";
  private displayDate = ""; 
  private expiresOn = new Date();
  private scheduleDate = new Date();
  private triggerJobsUpdate: Function;
  private priceMask = createNumberMask({
    prefix: '$'
  });

  // ui settings
  public swiperConfig = {
    slidesPerView: 3,
    breakpoints: {
      400: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      800: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  };

  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.user.subscribe(user => {
      this.user = user;

      if (this.model) {
        if (this.user._id === this.model.userId) {
          this.editable = true;
        }
      }
    });

    this.getRequest();
  }

  getRequest() {
    this.requestService.get(this.id).subscribe(res => {
      this.model = res;
      this.priceRange = `$${this.model.minPrice} - $${this.model.maxPrice}`;
      this.displayDate = DateTime.fromISO(
        this.model.scheduleDate
      ).toFormat('LL/dd/yyyy | t');

      if (this.user) {
        if (this.user._id === this.model.userId) {
          this.editable = true;
        }
      }
    });
  }

  closeModal() {
    this.activeModal.close();

  }

  sendOffer() {
    const modalRef = this.modalService.open(SendOfferModalComponent);
    modalRef.componentInstance.model = this.model;
    this.activeModal.close();
  }

  saveJob() {
    let id = this.model._id;
    let data = this.model;
    data['scheduleDate'] = this.scheduleDate.toISOString();
    data['expiresAt'] = this.expiresOn.toISOString();

    if (typeof data['minPrice'] === 'string') {
      if (data['minPrice'][0] === '$') data['minPrice'] = data['minPrice'].substr(1);
      data['minPrice'] = parseInt(data['minPrice'].replace(/,/g, ''));
    }
    if (typeof data['maxPrice'] === 'string') {
      if (data['maxPrice'][0] === '$') data['maxPrice'] = data['maxPrice'].substr(1);
      data['maxPrice'] = parseInt(data['maxPrice'].replace(/,/g, ''));
    }


    // console.log('DATA', data);
    this.requestService.updateRequest(data, id)
      .first()
      .subscribe(res => {
        if (res && res['success']) {
          this.triggerJobsUpdate();
          this.closeModal();
        }
      })
  }

  deleteJob() {
    let id = this.model._id;
    this.requestService.deleteRequest(id)
      .first()
      .subscribe(res => {
        if (res && res['success']) {
          this.triggerJobsUpdate();
          this.closeModal();
        }
      })
  }

  goToChat() {
    this.router.navigateByUrl('/chat/' + this.model.userId);
    this.closeModal();
  }

}
