import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

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
import { environment } from './../../environments/environment';
import { User } from './../interfaces/user';

@Injectable()
export class SearchService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  tags(q:string = '') {
    const url = `https://search-pointters-es-dev-cn37tjlkgx574lzojxb7esinzm.us-east-1.es.amazonaws.com/users,services/_search`;
    let httpOptions: { headers: any, params?: any } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (q) httpOptions = { ...httpOptions, params: { q } };

    return this.http.get(url, httpOptions)
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

}
