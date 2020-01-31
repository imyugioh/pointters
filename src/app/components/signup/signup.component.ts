import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {AuthService} from './../../services/auth.service';
import {UserService} from './../../services/user.service';

import {AuthType} from './../../constants/auth-type.enum';
import {User} from './../../interfaces/user';
require('aws-sdk');

declare var $: any;

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent {

  @Input() step = 1;
  @Input() switchToPersonal: Function;

  constructor(private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private userService: UserService,
              private router: Router) {


  }

  // ngOnInit() {
  //  $('.modal-backdrop').on('click', this.closeModal);
  // }

  handleCredintalsSuccess() {
    this.userService.get().subscribe();
    this.activeModal.close();
    this.switchToPersonal();
    // this.step = 2;
  }

  handlePersonalSuccess() {
    this.userService.get().subscribe();
    this.activeModal.close();
    this.router.navigate(['/home']);
  }

  // closeModal = () => {
  //   if (this.step === 1) {
  //     $('.modal-backdrop').off('click', this.closeModal);
  //     //this.activeModal.close();
  //   }
  // }


  // open() {
  //   this.activeModal.close();
  //   const modalRef = this.modalService.open(SigninComponent);
  //   const signInComponent: SigninComponent = modalRef.componentInstance as SigninComponent;

  //   signInComponent.successHandler.subscribe(() => {
  //     modalRef.close();
  //     // this.handleSuccessLogin()
  //   });
  // }
}
