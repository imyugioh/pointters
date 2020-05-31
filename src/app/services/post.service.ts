import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

import { AuthService } from "./auth.service";
import { environment } from './../../environments/environment';

import { Post } from "./../interfaces/post";
import {} from "@angular/common/http";

@Injectable()
export class PostService {
  private apiUrl = `${environment.apiUrl}post`;
  constructor(private http: HttpClient, private authService: AuthService) {}

  createPost(data: Post) {
    const url = this.apiUrl;

    return this.http.post(url, data);
  }

  getPosts(skip = 0, limit = 5) {
    const url = this.apiUrl + "s";

    const params = new HttpParams()
      .set("skip", skip + "")
      .set("limit", limit + "");

    return this.http.get(url, {
      params
    });
  }

  getPostsTag(query, size = 5, from = 0) {
    const url = this.apiUrl + `/tag/search`;

    const params = new HttpParams().set("q", query);

    return this.http.get(url, { params });
  }


  getComments(id, lt) {
    const url = this.apiUrl + `/${id}/comments`;
    let params = new HttpParams();

    if(lt) {
      params = params.set('lt_id', lt);
    }

    return this.http.get(url, {
      params,
    });

  }

  postComment(id, comment) {
    const url = this.apiUrl + `/${id}/comment`;

    return this.http.post(url, {
      comment
    });
  }

  postLike(id, like) {
    const url = this.apiUrl + `/${id}/like`;

    if (like) { return this.http.post(url, {
      liked: true,
    }); }
    else { return this.http.delete(url); }
  }

  getLikes(id, lt = null) {
    const url = this.apiUrl + `/${id}/likes`;
    let params = new HttpParams();

    if(lt) {
      params = params.set('lt_id', lt);
    }

    return this.http.get(url, {
      params,
    });

  }

  getShares(id, lt = null) {
    const url = this.apiUrl + `/${id}/shares`;
    let params = new HttpParams();

    if(lt) {
      params = params.set('lt_id', lt);
    }

    return this.http.get(url, {
      params,
    });

  }
}
