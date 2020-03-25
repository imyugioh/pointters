import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { ServiceAddComponent } from './../../routes/service/service-add/service-add.component';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  query: string;
  focusSearch: boolean;
  isLoggedIn : boolean;
  showSearchLocations: boolean;
  toggleMN: boolean;
  searchForm : FormGroup;

  public user: User;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public userService: UserService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.isLoggedIn = false;
    this.showSearchLocations = false;
    this.focusSearch = false;

    this.userService.user.subscribe(user => {
      this.user = user;

      this.isLoggedIn = this.authService.isLoggedIn;
    });

    this.searchForm = this.formBuilder.group({
      search: [null, Validators.required]
    });
  }

  onClickLocation(): void {
    this.showSearchLocations = true;
  }

  onBlurLocation(): void {
    this.showSearchLocations = false;
  }

  onClickSearch(): void {
    this.focusSearch = true;
    this.showSearchLocations = false;
  }

  onBlurSearch(): void {
    this.focusSearch = false;
  }

  handleKeyupSearch(event: any): void {
    this.query = event.target.value;
  }

  handleSuccessLogin(): void {
    this.isLoggedIn = true;

    this.router.navigate(["/home"]);
  }

  handleSuccessLogout(): void {
    this.isLoggedIn = false;
  }

  handleSuccessSignup(): void {
    this.isLoggedIn = true;
    this.router.navigate(["/home"]);
  }

  open() {
    const modalRef = this.modalService.open(SigninComponent);
    const signInComponent : SigninComponent = modalRef.componentInstance as SigninComponent;

    signInComponent.successHandler.subscribe(() => {
      modalRef.close()
      this.handleSuccessLogin()
    });
  }

  openSignupModal() {
    const modalRef = this.modalService.open(SignupComponent);
    const signUpComponent: SignupComponent = modalRef.componentInstance as SignupComponent;

    // signUpComponent.successHandler.subscribe(() => {
    //   modalRef.close()
    //   this.handleSuccessSignup()
    // })
  }

  openAddService() {
    const modalRef = this.modalService.open(ServiceAddComponent);
    const serviceAddComponent : ServiceAddComponent = modalRef.componentInstance as ServiceAddComponent

    serviceAddComponent.successHandler.subscribe(() => {
      modalRef.close()
      this.handleSuccessSignup()
    })
  }

}
