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
import { Observable } from 'rxjs/Rx';

import { UserService } from './../../services/user.service';

@Injectable()
export class FollowingResolver implements Resolve<any> {
  constructor(
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.userService.getFollowing();
  }
}
