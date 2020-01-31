import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../interfaces/user';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authservice: AuthService,
    public userService: UserService, 
    public router: Router) {}

  canActivate() {

    if (!this.authservice.isLoggedIn) {
      this.router.navigate([''], {
        queryParams: {
          'should_login': true,
        }
      });

      return false;
    }


    return this.userService.user.map( (user) => {

      console.log(user);

      if (user && !user.completedRegistration) {
        this.router.navigate([''], {
          queryParams: {
            'should_fill_personal': true,
          }
        });
        return false;
      }

      return true;
    });
  }


}
