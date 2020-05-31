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
export class ExploreJobsService {
  private apiUrl = `${environment.apiUrl}explore/jobs`;

  constructor(private http: HttpClient,
    private authService: AuthService) {
  }


  /**
   * get jobs
   *
   * @returns http response value
   * @memberof ExploreJobsService
   */
  getJobs(page?: number, categoryId?: string, geoWithin?: string) {
    const url = this.apiUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }),
    };

    return this.http.get(url + `?page=${page || 1}${categoryId ? '&categoryId=' + categoryId : ''}${geoWithin ? '&geoWithin=' + geoWithin : ''}`, httpOptions)
      .pipe(
        tap((res) => {
          console.log(res);
          return res;
        }),
        catchError((err: any) => {
          console.log('error', err);
          return Observable.of({})
        })
      );
  }


  /**
   * get jobs by location
   *
   * @returns http response value
   * @memberof ExploreJobsService
   */
   getJobsByLocation(geoWithin?: string, categoryId?: string, page?) {
     const url = this.apiUrl;

     let params = {};
     if (geoWithin) params['geoWithin'] = geoWithin;
     if (categoryId) params['categoryId'] = categoryId;
     if (page) params['page'] = page;

     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${this.authService.token}`
       }),
       params: new HttpParams({
         fromObject: params
       })
     };
     //
     // let reqUrl = url + `?${categoryId ? 'categoryId=' + categoryId : ''}${geoWithin ? '&geoWithin=' + geoWithin : ''}${ typeof page === 'number' ? '&page=' + page : ''}`;
     //


     return this.http.get(url, httpOptions)
       .pipe(
         tap((res) => {
           console.log('JOBS BY LOCATION', res);
           return res;
         }),
         catchError((err: any) => {
           console.log('error', err);
           return Observable.of({})
         })
       );
   }
}
