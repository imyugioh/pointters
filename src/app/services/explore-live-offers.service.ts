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
export class ExploreLiveOffersService {
  constructor(private http: HttpClient,
    private authService: AuthService) {
  }

  getSuggestedOffers(page?) {
    let url = `${environment.apiUrl}services/live-offer-suggested`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }),
    };


    return this.http.get(url + `${page > 0 ? '?page=' + page : ''}`, httpOptions);
  }


}
