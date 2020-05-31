import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

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

@Injectable()
export class CheckoutService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  getBraintreeToken() {
    let url = this.apiUrl + 'braintree/client-token';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };

    return this.http.get(url, httpOptions);
  }

  createPaymentMethod(data) {
    let url = this.apiUrl + 'braintree/payment-method';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };

    return this.http.post(url, data, httpOptions);
  }

  updatePaymentMethod(id, data) {
    let url = this.apiUrl + 'braintree/payment-method/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };

    return this.http.put(url, data, httpOptions);
  }

  deletePaymentMethod(id) {
    let url = this.apiUrl + 'braintree/payment-method/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };

    return this.http.delete(url, httpOptions);
  }

  getShippingRates() {
    let url = this.apiUrl + ''
  }

}
