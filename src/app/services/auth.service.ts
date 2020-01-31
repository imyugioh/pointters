import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import {
  FacebookService,
  InitParams,
  LoginResponse as FBLoginResponse
} from "ngx-facebook";

const CryptoJS = require("crypto-js");

import { environment } from "./../../environments/environment";

import { User } from "./../interfaces/user";
import { UserService } from "./../services/user.service";
import { LoginOptions } from "ngx-facebook/dist/esm/models/login-options";

@Injectable()
export class AuthService {



  public id: string;
  public token: string;
  public isLoggedIn: boolean;
  public fbData: FBLoginResponse;

  private apiUrl = environment.apiUrl;

  constructor( 
    private http: HttpClient, 
    private fb: FacebookService) {
      
    this.token = localStorage.getItem("token");

    if (this.token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    const initParams: InitParams = {
      appId: environment.FACEBOOK_APP_ID,
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }

  signin(email: string, password: string) {
    const url = `${this.apiUrl}user/login`;


    return this.http.post(url, { email, password: password }).pipe(
      tap((res: { completedRegistration: boolean; token: string }) => {
        const { completedRegistration, token } = res;
        this.token = token;

        if (completedRegistration) {
          this.isLoggedIn = true;
          localStorage.setItem("token", token);
        } else {
          this.isLoggedIn = false;
          localStorage.removeItem("token");
        }

        return token;
      })
    );
  }

  signinWithFB(token) {
    const url = `${this.apiUrl}user/facebook/token`;

    return this.http.post(url, { token }).pipe(
      tap((res: { token: string }) => {
        const { token } = res;

        this.token = token;
        this.isLoggedIn = true;

        localStorage.setItem("token", token);

        return token;
      })
    );
  }

  signout() {
    const url = `${this.apiUrl}user/logout`;
    
    this.token = null;
    this.isLoggedIn = false;

    localStorage.removeItem("token");

    return this.http.post(url, null).pipe(
      tap(res => {
        return res;
      }),
      catchError((err: any) => {
        throw { status: err.status, ...err.error };
      })
    );
  }

  signupWithEMail(email: string, password: string) {
    const url = `${this.apiUrl}user/signup`;

    return this.http.post(url, {
      email,
      password: password,
    }).pipe(
      tap((res: { id: string; token: string }) => {
        const { id, token } = res;
        this.id = id;
        this.token = token;
        this.isLoggedIn = true;

        localStorage.setItem('token', token);

        return token;
      })
    );
  }

  signupWithFB(token) {
    const url = `${this.apiUrl}user/facebook/token`;

    return this.http.post(url, { token }).pipe(
      tap((res: { id: string; token: string }) => {
        const { id, token } = res;
        this.id = id;
        this.token = token;
        this.isLoggedIn = true;
        localStorage.setItem('token', token);

        return token;
      })
    );
  }

  signupWithGoogle(): void {
    console.log('signup with google');
  }

  googleSignin(successHandler): any {}

  fbSignin() {
    const loginOptions: LoginOptions = {
      scope: 'public_profile,email',
      return_scopes: true,
    };

    return this.fb
      .login(loginOptions)
      .then((response: FBLoginResponse) => {
        return response;
      })
      .catch((err: any) => console.error(err));
  }

  getFacebookProfile(authResponse) {

    return this.fb.api(
      `/${authResponse.userID}?fields=first_name,last_name,email,picture&access_token=${authResponse.accessToken}`
    );
  }

  forgotPassword(email: string) {
    const url = `${this.apiUrl}user/otp`;

    return this.http.post(url, { email }).pipe(
      tap(res => {
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        throw { status: err.status, ...err.error };
      })
    );
  }
}
