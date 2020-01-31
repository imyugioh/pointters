import {
  catchError,
  map,
  take
} from 'rxjs/operators';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';

import { ConversationService } from './../../services/conversation.service';

@Injectable()
export class ChatResolver implements Resolve<any> {
  constructor(
    private conversationService: ConversationService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.conversationService.get();
  }
}
