import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { Observable } from 'rxjs/Observable';
import { GeolocationService } from '../../services/geolocation.service';

declare var $: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  @Output() successHandler = new EventEmitter<boolean>();

  form   : FormGroup;
  loading: boolean;
  error: {
    key: string,
    message: string,
    pass: string
  };

  private email     : string;
  private password  : string;

  private navigated : boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private router: Router,
    private geoService: GeolocationService,
    private modalService: NgbModal
  ) {
    this.successSigninWithFB = this.successSigninWithFB.bind(this);
    this.successSigninWithGoogle = this.successSigninWithGoogle.bind(this);
  }

  openSignupModal() {
    this.navigated = true;
    this.activeModal.close();
    this.router.navigate([''], {
      queryParams: {
        should_signup: true,
      }
    });
  }

  ngOnDestroy() {
    if (this.navigated) return;
    this.router.navigate([''], {
      queryParams: { }
    });
  }

  openSignupModalwithSignin() {
    this.activeModal.close();

    this.router.navigate([''], {
      queryParams: {
        should_signup: true,
      }
    });
  }

  closeModal = () => {
    $('.modal-backdrop').off('click', this.closeModal);
    this.activeModal.close();
  }

  ngOnInit() {
    this.loading = false;
    this.clearError();
    $('.modal-backdrop').on('click', this.closeModal);

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onClickForgotPW() {
    this.activeModal.close();
    const modalRef = this.modalService.open(ForgotPasswordComponent);
  }

  onClickSignin(email: string, password: string): void {
    this.authService.signin(email, password)
      .subscribe(
        (res) => {
          this.loading = false;
          const { completedRegistration } = res;
          if (completedRegistration) {
            this.successHandler.emit(true);
            this.userService.get().subscribe();
          } else {
            this.openSignupModal();
          }

        },
        (err) => {
          this.loading = false;
          console.log(err);
          switch (err.status) {
            case 401:
              this.error = {
                key: 'email',
                message: 'Invalid email or password',
                pass: 'password'
              }
              break;
            case 404:
              this.error = {
                key: 'email',
                message: 'Invalid email or password',
                pass: 'password'
              }
              break;
            default:
              // code...
              break;
          }
        }
      );
  }

  onClickSigninWithGoogle(): void {
    this.authService.googleSignin(this.successSigninWithGoogle);
  }

  // onClickSigninWithFB(): void {
  //   this.authService.fbSignin(this.successSigninWithFB);
  // }
  onClickSigninWithFB(): void {

    let login_info;
    let user;

    this.loading = true;

    this.authService
      .fbSignin()
      .then((value: any) => {
        login_info = value;
        return this.authService.getFacebookProfile(value.authResponse);
      })
      .then(fb_user => {
        this.loading = false;
        this.authService
          .signinWithFB(login_info.authResponse.accessToken)
          .switchMap(res => {

            this.activeModal.close();
            this.loading = false;

            let response : any = res;
            let  completedRegistration  = response.completedRegistration;

            this.authService.isLoggedIn = true;
            this.userService.get().subscribe();

            if (completedRegistration) {
              this.successHandler.emit(true);
              this.router.navigate(["/home"]);
              return Observable.empty();
            } else {

              user = {
                completedRegistration: true,
                completedRegistrationDate: new Date().toISOString(),
                firstName: fb_user.first_name,
                lastName: fb_user.last_name,
                email: fb_user.email,
                profilePic: fb_user.picture.data.url
              };

              return this.geoService.getCurrentLocation();

            }
          })

          .subscribe(res => {
            user["location"] = res;

            this.userService.update(user).subscribe(res => {
              this.authService.isLoggedIn = true;
              this.activeModal.close();
              this.router.navigate(["/home"]);
            });
          });
      });
  }

  successSigninWithGoogle(data: any): void {
    console.log(data);
  }

  successSigninWithFB(data: any): void {

    this.authService.signinWithFB(data.authResponse.accessToken)
      .subscribe(
        (res) => {
          this.activeModal.close();
          this.loading = false;
          let response : any = res;
          let  completedRegistration  = response.completedRegistration;
          this.userService.get().subscribe();
          if (completedRegistration) {
            this.successHandler.emit(true);
          } else {

            this.router.navigate([''], {
              queryParams: {
                should_fill_personal: true,
              }
            });
          }
        },
        (err) => {
          console.log(err);
          this.loading = false;
          switch (err.status) {
            case 403:
              this.error = {
                key: 'fb',
                message: 'Facebook access invalid',
                pass: 'password'
              }
              break;

            default:
              // code...
              break;
          }
        }
      );
    console.log(data);
  }

  clearError() {
    this.error = {
      key: '',
      message: '',
      pass: ''
    };
  }
}
