import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ServiceUnit } from './../interfaces/service-unit';

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

import { AuthService } from './auth.service';
import { Paginated } from './../interfaces/paginated';
import { environment } from './../../environments/environment';

@Injectable()
export class ServiceService {
  private apiUrl = `${environment.apiUrl}service/`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getDetail(idService) {
    const url = `${this.apiUrl}${idService}/detail`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };
    return this.http.get(url, httpOptions)
      .pipe(
        tap((res: Paginated) => res),
        catchError((err: any) => Observable.throw({ status: err.status, ...err.error }))
      );
  }

  getRelated(idService) {
    const url = `${this.apiUrl}${idService}/related`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };
    return this.http.get(url, httpOptions)
      .pipe(
        tap((res: Paginated) => res),
        catchError((err: any) => Observable.throw({ status: err.status, ...err.error }))
      );
  }

  getReviews(idService, lastDocId?) {
    const url = `${this.apiUrl}${idService}/reviews`;

    let params = new HttpParams();

    if(lastDocId) {
      params = params.set("lastDocId", lastDocId);
    }

    return this.http.get(url, {
      params,
    })
      .pipe(
        tap((res: Paginated) => res),
        catchError((err: any) => Observable.throw({ status: err.status, ...err.error }))
      );
  }

  delete(id) {
    const url = `${this.apiUrl}${id}`;

    return this.http.delete(url);
  }

  getCategories() {
    const url = `${environment.apiUrl}categories`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(url, httpOptions)
    .pipe(
      tap((res) => {
        
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        throw {status: err.status, ...err.error};
      })
    );
  }

  addService(newService: ServiceUnit) {
    const url = `${this.apiUrl}`;

    
    return this.http.post(url,newService)
    .pipe(
      tap((res) => {
        return res;
      })
    );
  }

  updateService(service) {
    const url = `${this.apiUrl}${service.id}`;

    return this.http.put(url,service)
    .pipe(
      tap((res) => {
        return res;
      })
    );
  }

  getServices(userId = '', lt_id = '') {
    const url = `${environment.apiUrl}services`;
    let httpOptions: { headers: any, params?: any } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };

    if (userId) httpOptions = { ...httpOptions, params: { userId } };
    if (lt_id) httpOptions = { ...httpOptions, params: { lt_id } };

    return this.http.get(url, httpOptions)
      .pipe(
        tap((res: Paginated) => res),
        catchError((err: any) => Observable.throw({ status: err.status, ...err.error }))
      );
  }


  /**
   * 
   * 
   * @param {number} [page=1] page number
   * @param {number} [limit=10] number of entries per page
   * @returns {Paginated} list of services and upcoming services
   * @memberof ServiceService
   */
  getServicesExplore(page: number = 1, limit: number = 10) {
    const url = `${environment.apiUrl}services/explore`;

    const httpOptions: { headers: any, params?: any } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }),

      params: {
        page,
        limit,
        app: 'angular'
      },
    };

    return this.http.get(url, httpOptions)
      .pipe(
        tap((res: Paginated) => res),
        catchError((err: any) => Observable.throw({ status: err.status, ...err.error }))
      );
  }


  // likes, share, watch

  setShare(id) {
    
  }

  removeShare(id) {
    
  }

  setLike(idService) {
    const url = `${this.apiUrl}${idService}/like`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };
    
    return this.http.post(url, {},httpOptions)
    .pipe(
      tap((res) => {
        console.log(res);
        return res;
      })
    );
  }

  getLike(idService) {
    const url = `${this.apiUrl}${idService}/like`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };
    
    return this.http.get(url,httpOptions)
    .pipe(
      tap((res) => {
        console.log(res);
        return res;
      })
    );
  }


  removeLike(idService) {
    const url = `${this.apiUrl}${idService}/like`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };
    
    return this.http.delete(url,httpOptions)
    .pipe(
      tap((res) => {
        console.log(res);
        return res;
      })
    );
  }

  setWatch(idService) {
    const url = `${this.apiUrl}${idService}/watch`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };
    
    return this.http.post(url, {},httpOptions)
    .pipe(
      tap((res : {liked}) => {
        console.log(res);
        return res;
      })
    );
  }

  getWatching(lt_id = '') {
    const url = `${environment.apiUrl}services/watching`;


    let params = new HttpParams();

    if (lt_id && lt_id.length > 0) {
      params = params.set('lt_id', lt_id);
    }

    return this.http.get(url, {
      params,
    });
  }


  getWatch(idService) {
    const url = `${this.apiUrl}${idService}/watch`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };
    
    return this.http.get(url,httpOptions)
    .pipe(
      tap((res) => {
        return res;
      })
    );
  }

  removeWatch(idService) {
    const url = `${this.apiUrl}${idService}/watch`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };
    
    return this.http.delete(url,httpOptions)
    .pipe(
      tap((res) => {
        console.log(res);
        return res;
      })
    );
  }

  getLiked(lt_id = '') {
    const url = `${environment.apiUrl}services/liked`;


    let params = new HttpParams();

    if (lt_id && lt_id.length > 0) {
      params = params.set('lt_id', lt_id);
    }

    return this.http.get(url, {
      params,
    });
  }



 

}
