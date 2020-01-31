import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthType } from "../../../constants/auth-type.enum";
import { AuthService } from "../../../services/auth.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../../../services/user.service";
import { GeolocationService } from "../../../services/geolocation.service";
import { Observable } from "rxjs/Observable";


@Component({
  selector: "app-signup-credintals",
  templateUrl: "./signup-credintals.component.html",
  styleUrls: ["./signup-credintals.component.scss"]
})
export class SignupCredintalsComponent implements OnInit, OnDestroy {
  @Output() private success: EventEmitter<any> = new EventEmitter();
  @Input() private step;

  public crendintals_form: FormGroup;
  public submited = false;

  private token: string;
  public loading = false;
  public serror = null;

  private navigated: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private geoService: GeolocationService
  ) {}

  ngOnInit() {
    this.crendintals_form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)]
      })
    });
  }

  ngOnDestroy() {
    if (this.navigated) return;
    this.router.navigate([''], {
      queryParams: { }
    });

  }

  signupCrendintals() {

    this.submited = true;
    this.serror = null;

    const keys = Object.keys(this.crendintals_form.controls);
    keys.forEach(key => {
      this.crendintals_form.get(key).markAsDirty();
      this.crendintals_form.get(key).markAsTouched();
    });

    if (this.crendintals_form.valid) {
      this.loading = true;

      this.authService
        .signupWithEMail(
          this.crendintals_form.get("email").value,
          this.crendintals_form.get("password").value
        )
        .subscribe(
          res => {
            this.navigated = true;
            this.success.emit(true);

            this.loading = false;
          },

          err => {
            switch (err.status) {
              case 409:
                this.serror = "Email is already used";
                break;
              case 500:
                this.serror = err.error.message;
            }

            this.loading = false;
          }
        );
    }
  }

  signupFacebook() {
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

            let response: any = res;
            let completedRegistration = response.completedRegistration;

            this.authService.isLoggedIn = true;
            this.userService.get().subscribe();

            if (completedRegistration) {
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

  signupGoogle() {}

  openLoginModal() {
    this.navigated = true;
    this.activeModal.close();
    this.router.navigate([""], {
      queryParams: {
        should_login: true
      }
    });
  }
}
