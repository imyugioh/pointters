import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../../../services/user.service";
import { GeolocationService } from "../../../services/geolocation.service";
import { User } from "../../../interfaces/user";
import { environment } from "../../../../environments/environment.dev";

@Component({
  selector: "app-signup-personal",
  templateUrl: './signup-personal.component.html',
  styleUrls: ["./signup-personal.component.scss"]
})
export class SignupPersonalComponent implements OnInit {
  @Output() success: EventEmitter<boolean> = new EventEmitter();

  public avaimg = "assets/images/icons/oval.png";

  public form: FormGroup;
  private profilePic = this.avaimg;

  public location;
  public submited = false;
  public user: User;

  public uploadedAvatar: boolean = false;

  public loading = false;
  public serror = null;

  private profilePicErr: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private geolocation: GeolocationService,
    private router: Router,
    private activeModal: NgbActiveModal
  ) {

    this.userService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    });

    this.getCurrentLocation();
  }

  getCurrentLocation() {
    return this.geolocation.getCurrentLocation().subscribe(location => {
      this.location = location;
    });
  }

  submit() {
    this.submited = true;

    if (!this.profilePic || this.profilePic === 'assets/images/icons/oval.png') {
      this.profilePicErr = true;
      return;
    }

    const keys = Object.keys(this.form.controls);
    keys.forEach(key => {
      this.form.get(key).markAsDirty();
      this.form.get(key).markAsTouched();
    });

    if (this.form.valid) {
      this.loading = true;

      this.location = {
        ...this.location,
        postalCode: this.location.postalCode + ""
      };

      this.userService
        .update({
          ...this.user,

          completedRegistration: true,
          completedRegistrationDate: new Date().toISOString(),
          firstName: this.form.get("firstName").value,
          lastName: this.form.get("lastName").value,
          location: this.location,
          profilePic: this.profilePic
        } as User)
        .subscribe(res => {
          if (res.success) {
            console.log(this.user);
            this.success.emit(true);
          }
        });
    }
  }



  fileEvent(fileInput: any) {

    function makeid(text = '') {
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    this.loading = true;

    const AWSService = window.AWS;
    const file = fileInput.target.files[0];
    const onlyName = file.name.split('.');
    AWSService.config.accessKeyId = environment.AWSAccessKeyId;
    AWSService.config.secretAccessKey = environment.AWSSecretAccessKey;
    onlyName[0] = makeid(onlyName[0])
    const bucket = new AWSService.S3();
    const params = {
      Key: onlyName[0] + '.' + onlyName[1],
      Body: file,
      ACL: 'public-read',
      Bucket: environment.AWSBucket
    };

    bucket.putObject(params, (error, res) => {
      this.profilePic = this.avaimg = `https://s3.amazonaws.com/pointters_dev/dev/${onlyName[0]}.${onlyName[1]}`;
      this.uploadedAvatar = true;
      this.profilePicErr = false;
      this.loading = false;
    });
  }

  goToSignin() {
    // this.navigated = true;
    this.activeModal.close();
    this.router.navigate([""], {
      queryParams: {
        should_login: true
      }
    });
  }

  // onClickSignup(): void {
  //   let promise = null;
  //   this.userInfo.completedRegistration = true;
  //   if(this.userInfo.location.city == "") this.userInfo.location.city = "city";
  //   if(this.userInfo.location.postalCode == "") this.userInfo.location.postalCode = "123456";
  //   const vm = this;
  //   // switch (this.authType) {
  //   //   case AuthType.Email:
  //   //     promise = this.userService.update(vm.userInfo);
  //   //     break;

  //   //   case AuthType.Google:
  //   //     promise = this.authService.signupWithGoogle();
  //   //     break;

  //   //   case AuthType.Facebook:
  //   //     promise = this.authService.signupWithFB(this.token);
  //   //     break;

  //   //   default:
  //   //     promise = this.userService.update(vm.userInfo);
  //   //     break;
  //   // }
  //   promise = this.userService.update(vm.userInfo);
  //   promise
  //     .subscribe(
  //       (res: any) => {
  //         this.loading = false;
  //         if (vm.userInfo.completedRegistration &&
  //           vm.userInfo.firstName &&
  //           vm.userInfo.lastName &&
  //           vm.userInfo.profilePic != "assets/images/icons/oval.png" &&
  //           vm.userInfo.location) {
  //           this.successHandler.emit(true);
  //         } else {
  //             this.error = {
  //               key: 'location',  message: 'All fields are required!'
  //             };

  //           this.goNext();
  //         }},
  //       (err: any) => {
  //         this.loading = false;
  //         console.log(err);
  //         switch (err.status) {
  //           case 409:
  //             this.error = {
  //               key: 'email',
  //               message: 'Email is already used'
  //             };
  //             this.goBack();
  //             break;
  //           case 500:
  //             this.error = {
  //               key: 'email',
  //               message: err.error.message
  //             };
  //             break;
  //           default:
  //             // code...
  //             break;
  //         }
  //       }
  //     );
  // }
}
