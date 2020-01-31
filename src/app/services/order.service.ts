import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class OrderService {
  private apiUrl = `${environment.apiUrl}order`;

  constructor(private http: HttpClient) {
  }

  getBuy(params) {
    const url = this.apiUrl;

    const httpOptions = {

      params: new HttpParams({
        fromObject: params,
      }),
    };

    return this.http.get(url + 's/buy', httpOptions);
  }

  getSell(params) {
    const url = this.apiUrl;

    const httpOptions = {
 
      params: new HttpParams({
        fromObject: params,
      }),
    };

    return this.http.get(url + 's/sell', httpOptions);
  }

}