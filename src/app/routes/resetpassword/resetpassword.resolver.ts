
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  
  
  @Injectable()
  export class ResetpasswordResolver implements Resolve<any> {
    constructor(
    ) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    }
  }
  