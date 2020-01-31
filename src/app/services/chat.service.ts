import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

import { Socket } from 'ng-socket-io';

import { environment } from './../../environments/environment';

export class ChatService extends Socket {

  constructor(private token) {
      super({ url: `${environment.apiUrl}?token=${token}`, options: {} });
   }
}
