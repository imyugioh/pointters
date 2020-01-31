import { Component, OnInit } from "@angular/core";
import { RequestService } from "../../../services/request.service";
import { UserService } from "../../../services/user.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";
import { Router } from "@angular/router";
import { User } from "../../../interfaces/user";

import { DateTime } from 'luxon';

@Component({
  selector: 'app-request-detail-modal',
  templateUrl: './request-detail-modal.component.html',
  styleUrls: ['./request-detail-modal.component.css']
})
export class RequestDetailModalComponent {
  private id: string;
  private user: User;
  private model: any;

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
    private activeModal: NgbActiveModal, 
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.user.subscribe(user => {
      this.user = user;
    });

    this.getRequest();
  }

  getRequest() {
    this.requestService.get(this.id).subscribe(res => {
      this.model = res['request'] || res;
      this.model.scheduleDate = DateTime.fromISO(
        this.model.scheduleDate
      ).toFormat('LL/dd/yyyy | t');
    });
  }
  closeModal = () => {
    this.activeModal.close();
  }
}
