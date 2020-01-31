import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class OfferService {
  private apiUrl = `${environment.apiUrl}offer`;
  private requestUrl = `${environment.apiUrl}request`;

  constructor(private http: HttpClient,
    private authService: AuthService) {
  }



  /**
   * Get an offer by it id
   *
   * @param {string} id
   * @returns {Offer} offer
   * @memberof OfferService
   */
  get(id: string) {
    const url = this.apiUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }),
    };

    return this.http.get(url + `/${id}`, httpOptions);
  }


  /**
   * Delete an offer owned by this user
   *
   * @param {string} id offer id
   * @returns deleted
   * @memberof OfferService
   */
  delete(id: string) {
    const url = this.apiUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }),
    };

    return this.http.delete(url + `/${id}`, httpOptions);
  }


  /**
   * get Received offers
   *
   * @param {any} params filters and pagination
   * @returns list of offers
   * @memberof OfferService
   */
  getReceived(params) {
    const url = this.apiUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }),

      params: new HttpParams({
        fromObject: params,
      }),
    };

    return this.http.get(url + 's/received', httpOptions);
  }


  /**
   * get sent offers for current user
   *
   * @param {any} params filters and pagination
   * @returns list of offers
   * @memberof OfferService
   */
  getSent(params) {
    const url = this.apiUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      }),

      params: new HttpParams({
        fromObject: params,
      }),
    };

    return this.http.get(url + 's/sent', httpOptions);
  }


  updateCustomOffer(data, offerId: string) {
    const url = `${this.apiUrl}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };
    if (!offerId) {
      return this.http.post(url, data, httpOptions)
    } else {
      return this.http.put(url + `/${offerId}`, data, httpOptions)
  }
}

  /**
   * send offer
   *
   * @memberof OfferService
   */
   sendCustomOffer(id: string, data) {
     const url = `${this.requestUrl}/${id}/offer`;
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${this.authService.token}`
       })
     };

     return this.http.post(url, data, httpOptions)
   }

}
