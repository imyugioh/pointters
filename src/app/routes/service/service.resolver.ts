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

import { ServiceService } from './../../services/service.service';

@Injectable()
export class ServiceReviewsResolver implements Resolve<any> {
  constructor(
    private serviceService: ServiceService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const idService = route.params.idService;
    return this.serviceService.getReviews(idService);
  }
}


@Injectable()
export class ServiceRelatedResolver implements Resolve<any> {
  constructor(
    private serviceService: ServiceService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const idService = route.params.idService;
    return this.serviceService.getRelated(idService);
  }
}


@Injectable()
export class ServiceDetailResolver implements Resolve<any> {
  constructor(
    private serviceService: ServiceService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const idService = route.params.idService;
    return this.serviceService.getDetail(idService);
  }
}