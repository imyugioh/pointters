import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SigninComponent} from '../../components/signin/signin.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../services/auth.service';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  display = 'block';
  form: FormGroup;

  email: any;
  token: any;

  error: {
    key: string,
    message: string,
    pass: string
  };

  public loaded = false;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute) {
                
 
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      password: [null, [Validators.required]]
    });

    this.activatedRoute.params.switchMap(params => {
      this.email = params['email'];
      this.token = params['token'];

      return this.userService.resetPasswordValid(this.email, this.token);
    }).map((res) => {

      this.loaded = true;

    }).catch( err => {
      this.router.navigate(['/home']);
      return Observable.empty();
    })
    .subscribe();
  }

  onCloseHandled() {
    this.display = 'none';
    this.router.navigate(['/home']);
  }

  open() {
    this.display = 'none';
    this.router.navigate(['/home']);
    const modalRef = this.modalService.open(SigninComponent);
    const signInComponent: SigninComponent = modalRef.componentInstance as SigninComponent;

    signInComponent.successHandler.subscribe(() => {
      modalRef.close();
    });
  }

  reset(password: string) {

    this.userService.resetPassword(this.email, this.token, password).subscribe(
      (res) => {
        this.display = 'none';
        this.authService.signin(this.email, password).subscribe(res => {
          this.router.navigate(['/home']);
          this.authService.isLoggedIn = true;
          this.userService.get().subscribe();
        });
        
        
      },
      (err) => {
        switch (err.status) {
          case 200:
            this.display = 'none';
            this.authService.signin(this.email, password);
            this.router.navigate(['/']);
            break;
          case 401:
            document.getElementById('password').style.background = 'pink';
            this.error = {
              key: 'password',
              message: 'The password not valid',
              pass: 'password'
            };
            break;
          case 404:
            document.getElementById('password').style.background = 'pink';
            this.error = {
              key: 'password',
              message: 'The password not valid',
              pass: 'password'
            };
            break;
          default:
            // code...
            break;
        }
      }
    );
  }

}
