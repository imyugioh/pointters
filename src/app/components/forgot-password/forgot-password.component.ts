import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../../services/auth.service';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @Output() successHandler = new EventEmitter<boolean>();
  form   : FormGroup;
  loading: boolean;
  error: {
    key: string,
    message: string,
    pass: string
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loading = false;

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  onClickSubmit(email: string): void {
    this.authService.forgotPassword(email).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        delete this.error;
        switch (err.status) {
          case 200:
            this.error = {
              key: 'success',
              message: 'We have sent you an email to reset your password. Check your email to continue',
              pass: 'password'
            };
            document.getElementById('email').style.background = "none";
            break;
          case 404:
            this.error = {
              key: 'email',
              message: 'Email is invalid',
              pass: ''
            };
            document.getElementById('email').style.background = "pink";
            break;
          default:
            // code...
            break;
        }
      }
    );
  }

  onClickSignIn() {
    this.activeModal.close();
    const modalRef = this.modalService.open(SigninComponent);
    const signInComponent : SigninComponent = modalRef.componentInstance as SigninComponent

    signInComponent.successHandler.subscribe(() => {
      modalRef.close()
      // this.handleSuccessLogin()
    })
  }
}
