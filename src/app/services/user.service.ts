import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

const CryptoJS = require("crypto-js");

import { AuthService } from "./auth.service";
import { Paginated } from './../interfaces/paginated';
import { environment } from './../../environments/environment';
import { User } from './../interfaces/user';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class UserService {

  private apiUrl = `${environment.apiUrl}user/`;

  public followers: Paginated;

  public user_data: User;
  public user: BehaviorSubject<User> = new BehaviorSubject(null);
  public stats: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private authService: AuthService) {


    Observable.interval(8000)
    .startWith(0)
    .switchMap(val => {
      if(this.user.getValue() != null)  {
        return this.getStats();
      };

      return Observable.empty();
    })
    .subscribe(stats => {
      this.stats.next(stats['counts']);
    });
  }

  get() {
    const url = `${this.apiUrl}`;

    return this.http.get(url).pipe(
      tap((res: { user: User }) => {
        this.user.next(res.user);
        this.user_data = res.user;
      })
    );
  }

  getStats() {
    const url = `${this.apiUrl}menu`;

    return this.http.get(url).pipe(
      tap((res: { result }) => {
        return res;
      })
    );
  }

  getUserProfile(userId) {
    const url = `${this.apiUrl}profile/`;
    let httpOptions: { headers: any; params?: any } = {
      headers: new HttpHeaders({
      })
    };

    if (userId) {
      httpOptions = { ...httpOptions, params: { userId } };
    }

    return this.http.get(url, httpOptions).pipe(
      tap((res: { result }) => {
        return res.result;
      })
    );
  }

  update(user: User) {
    const url = `${this.apiUrl}`;

    return this.http.put(url, user).pipe(
      tap((res: { success?: string }) => {
        console.log('updated from user service ' + user);
        this.user_data = { ...this.user_data, ...user };
        console.log(this.user_data);
        this.user.next(this.user_data);
        return res;
      })
    );
  }

  getFollowers(lt_id = '') {
    const url = `${this.apiUrl}followers`;
    let httpOptions: { headers: any; params?: any } = {
      headers: new HttpHeaders({
      })
    };

    if (lt_id) {
      httpOptions = { ...httpOptions, params: { lt_id } };
    }

    return this.http
      .get(url, httpOptions)
      .pipe(
        tap((res: Paginated) => res),
        catchError((err: any) =>
          Observable.throw({ status: err.status, ...err.error })
        )
      );
  }

  getFollowing(lt_id = '') {
    const url = `${this.apiUrl}following`;
    let httpOptions: { headers: any; params?: any } = {
      headers: new HttpHeaders({
      })
    };

    if (lt_id) {
      httpOptions = { ...httpOptions, params: { lt_id } };
    }

    return this.http
      .get(url, httpOptions)
      .map(res => res || {})
      .catch((error): Observable<any> =>
        Observable.throw(error || 'Server error')
      );
  }

  follow(id) {
    const url = `${this.apiUrl}${id}/follow`;
    return this.http.post(url, {});
  }

  changePassword(old_pass: string, new_pass: string) {
    const url = `${this.apiUrl}password`;

    return this.http.put(url, {
      email: this.user_data["email"],
      oldPassword: old_pass,
      newPassword: new_pass,
    });
  }

  resetPassword(email: string, oldPassword: string, newPassword: string) {
    const url = `${this.apiUrl}reset/password`;

    return this.http
      .post(url, { email, oldPassword, newPassword })
      .pipe(
        tap(res => {
          return res;
        }),
        catchError((err: any) => {
          throw { status: err.status, ...err.error };
        })
      );
  }

  resetPasswordValid(email, token) {
    const url = `${this.apiUrl}otp/validate`;

    return this.http
      .post(url, {
        email,
        token,
      });
  }

  setPermissions(permissions) {
    const url = `${this.apiUrl}setting`


    return this.http.put(url, permissions).do( () => {
      this.user_data['settings'] = {
        ...this.user_data['settings'],
        ...permissions,
      };

      this.user.next(this.user_data);
    });


  }

  getSuggestedUsers() {
    return this.http.get(`${environment.apiUrl}users/current-update-suggested`);
  }

  getDash() {
    const url = `${this.apiUrl}home/dashboard`
    return this.http.get(url);
  }
}
