import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

const CryptoJS = require("crypto-js");

import { AuthService } from "./auth.service";
import { Paginated } from './../interfaces/paginated';
import { environment } from './../../environments/environment';
import { User } from './../interfaces/user';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StatsService {


  public stats: BehaviorSubject<any> = new BehaviorSubject(null);
  
  constructor() { }

}
