import { Component, OnInit } from '@angular/core';
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupComponent } from '../../components/signup/signup.component';
import { SigninComponent } from '../../components/signin/signin.component';

// import { SignupCredintalsComponent } from '../../components/signup/signup-credintals/signup-credintals.component';
// import { SignupPersonalComponent } from '../../components/signup/signup-personal/signup-personal.component';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

      this.activatedRoute.queryParams.subscribe(params => {
        if (params['should_login']) {
          this.openLoginModal();
        } else if (params['should_signup']) {
          this.openSignupModal(1);
        } else if (params['should_fill_personal']) {
          this.openSignupModal(2);

        }
      });
  }


  openLoginModal() {
    const modalRef = this.modalService.open(SigninComponent);
    const signInComponent: SigninComponent = modalRef.componentInstance as SigninComponent;
  }

  openSignupModal(step = 1) {

    let modalRef;

    if (step === 1) {
      modalRef = this.modalService.open(SignupComponent);
    } else {
      modalRef = this.modalService.open(SignupComponent, { backdrop: 'static' });
    }
    const signUpComponent: SignupComponent = modalRef.componentInstance as SignupComponent;
    signUpComponent.switchToPersonal = this.changeSignupStep;
    signUpComponent.step = step;
  }

  changeSignupStep = () => {
    this.openSignupModal(2);
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }
}
