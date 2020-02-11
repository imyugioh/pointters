import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfferService } from '../../../services/offer.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { currentId } from 'async_hooks';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ConversationService } from '../../../services/conversation.service';
import mapStyle from './../../../interfaces/map-style';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit, OnDestroy {

  private model: any;
  private id: string;
  private user: User;
  private loadError: boolean = false;

  // 0 for Not Started
  // 1 for Success
  // 2 for Error
  private deleteStatus: number = 0;

  constructor(private offerService: OfferService,
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private conversationService: ConversationService,
    private router: Router,
  ) {

   }

  ngOnInit() {

    this.userService.user.subscribe(user => {
      this.user = user;
    });

    this.getOffer();
  }

  ngOnDestroy(): void {
  }


  getOffer() {
    this.offerService.get(this.id)
    .subscribe(
      (res) => {
        if (!res || !res['offer']) {
          this.loadError = true;
          return;
        }
        this.model = res["offer"]
      }),
      (err) => {
        this.loadError = true;
      }
  }

  deleteOffer() {
    this.offerService.delete(this.id).subscribe(
      (res) => {
        if (res['success']) {
          this.deleteStatus = 1;
          setTimeout(() => {
            this.closeModal();
          }, 1000);
        } else {
          this.deleteStatus = 2;
        }
      },

      (err) => {

      },
    );
  }

  closeModal() {
    this.activeModal.close();
  }

  goToService() {
    this.router.navigateByUrl('/service/detail/' + this.model._id);
    this.activeModal.close();
  }


  parseInt(number) {
    return parseInt(number, 10);
  }
}
