import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

import {
  Observable
} from 'rxjs/Observable';
import {
  of
} from 'rxjs/observable/of';
import {
  catchError,
  map,
  tap
} from 'rxjs/operators';

import { Paginated } from './../interfaces/paginated';

@Injectable()
export class NotificationsService {
  private apiUrl = `${environment.apiUrl}notification`;

  constructor(private http: HttpClient,
    private authService: AuthService) {
  }


  /**
   * get notifications
   *
   * @returns http response value
   * @memberof NotificationsService
   */
  get(lastId?: string) {
    const url = this.apiUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }),
    };

    return this.http.get(url + `s${lastId ? ('?lt_id=' + lastId) : ''}`, httpOptions)
      .pipe(
        tap((res: Paginated) => {
          return res;
        }),
        catchError((err: any) => {
          return Observable.throw({ status: err.status, ...err.error })
        })
      );
  }

  /**
   * mark notification as read
   *
   * @returns http response value
   * @memberof NotificationsService
   */
  readNotification(notificationId: string) {
    const url = this.apiUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }),
    };

    return this.http.put(url + '/read', httpOptions)
      .pipe(
        tap((res: any) => {
          return res;
        }),
        catchError((err: any) => {
          return Observable.throw({ status: err.status, ...err.error })
        })
      );
  }

  /**
   * get scrollbar width
   *
   * @memberof NotififcationssService
   */
  getScrollbarWidth() {
      var outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.width = "100px";
      outer.style.msOverflowStyle = "scrollbar";

      document.body.appendChild(outer);

      var widthNoScroll = outer.offsetWidth;
      // force scrollbars
      outer.style.overflow = "scroll";

      // add innerdiv
      var inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);

      var widthWithScroll = inner.offsetWidth;

      // remove divs
      outer.parentNode.removeChild(outer);

      return widthNoScroll - widthWithScroll;
  }
}
