import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Post} from '../interfaces/post';

@Injectable()
export class BuyService {
  private apiUrl = `${environment.apiUrl}orders/`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll() {
    const url = this.apiUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      })
    };

    return this.http.get(url + 'buy', httpOptions);
  }

}
