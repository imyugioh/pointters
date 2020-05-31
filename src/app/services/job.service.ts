import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class JobService {
  private apiUrl = `${environment.apiUrl}job`;

  constructor(private http: HttpClient,
    private authService: AuthService) {
  }

  getJobs(params) {
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

    return this.http.get(url + 's', httpOptions);
  }
}

