import { EventEmitter, Output, OnInit, Input,   Component,
  NgZone,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
const timeAgo = require('node-time-ago');

import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-comment-like-share',
  templateUrl: './comment-like-share.component.html',
  styleUrls: ['./comment-like-share.component.scss']
})
export class CommentLikeShareComponent implements OnInit {
  
  @Input() post_id;
  @Input() type: string;

  public fetchingLikes;
  public likes = [];
  public likes_lt;
  public likes_total = 0;
  public like_end = false;
  
  public fetchingComments;
  public comments = [];
  public comments_lt;
  public comment_total = 0;
  public comment_end = false;

  public fetchingShares;
  public shares = [];
  public shares_lt;
  public shares_total = 0;
  public shares_end = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private postService: PostService,
    private router: Router,
    private modalService: NgbModal
  ) {
    
  }

  ngOnInit() {
    this.getLikes().subscribe();
    this.getComments().subscribe();
    this.getShares().subscribe();  
  }

  getComments() {
    this.fetchingComments = true;

    return this.postService.getComments(this.post_id, this.comments_lt).map(res => {
      res['docs'].forEach(comment => {
        comment['comment']['timeago'] = timeAgo(comment['comment']['updatedAt']);
      });

      this.comments = [ ...this.comments, ...res['docs']];
      this.comment_total = res['total'];
      this.comments_lt = res['lastDocId'];

      this.fetchingComments = false;
    }).catch(err => {
      this.comment_end = true;
      this.fetchingComments = false;
      return Observable.empty();
    });
  }

  postComment() {

  }

  getLikes() {
    this.fetchingLikes = true;

    return this.postService.getLikes(this.post_id, this.likes_lt).map(res => {
      this.likes = res['docs'];
      this.likes_total = res['total'];
      this.likes_lt = res['lastDocId'];

      this.fetchingLikes = false;

    }).catch(err => {
      this.like_end = true;
      this.fetchingLikes = false;
      return Observable.empty();
    });
  }

  getShares() {
    this.fetchingShares = true;

    return this.postService.getShares(this.post_id, this.shares_lt).map(res => {
      this.shares = res['docs'];
      this.shares_total = res['total'];
      this.shares_lt = res['lastDocId'];

      this.fetchingShares = false;

    }).catch(err => {
      this.shares_end = true;
      this.fetchingShares = false;
      return Observable.empty();
    });
  }
  
  followUser(i) {
    this.userService.follow(this.likes[i]['user']['id']).subscribe(res => {
      this.likes[i]['followed'] = true;
    });
  }

  redirectToUser(id) {
    this.router.navigate(['/profile', id]).then(res => {
      this.activeModal.close();
    })
  }

  onGetMoreComment() {
    this.getComments().subscribe();
  }

  onGetMoreLikes() {
    this.getLikes().subscribe();
  }

  onGetMoreShares() {
    this.getShares().subscribe();
  }

}
