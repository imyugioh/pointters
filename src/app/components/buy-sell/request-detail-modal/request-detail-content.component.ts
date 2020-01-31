import { Component, OnInit, Input } from "@angular/core";
import { RequestService } from "../../../services/request.service";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { User } from "../../../interfaces/user";

import { DateTime } from 'luxon';

@Component({
  selector: 'app-request-detail-content',
  templateUrl: './request-detail-content.component.html',
  styleUrls: ['./request-detail-modal.component.css']
})
export class RequestDetailContentComponent implements OnInit {
  @Input() id: string;
  @Input() closeModal: Function = () => false;
  @Input() user: User;
  @Input() model: any;
  @Input() modalMode: boolean;

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
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.modalMode) {
      this.userService.user.subscribe(user => {
        this.user = user;
      });
    }

    if (!this.modalMode) this.getRequest();
  }

  getRequest() {
    this.requestService.get(this.id).subscribe(res => {
      this.model = res['request'] || res;
      this.model.scheduleDate = DateTime.fromISO(
        this.model.scheduleDate
      ).toFormat('LL/dd/yyyy | t');
    });
  }
}
