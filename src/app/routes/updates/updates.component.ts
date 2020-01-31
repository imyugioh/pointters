import { Component, OnInit,  HostListener, ViewChild, ElementRef, } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

var ta = require('time-ago')  // node.js
import { DateTime } from 'luxon';
import turf from '@turf/distance';

import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { CommentLikeShareComponent } from '../../components/comment-like-share/comment-like-share.component';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {


  public models: any[] = [];
  public suggested: any[] = null;
  public dashboard: any = null;
  public upcoming: any[];

  public user: User;

  private comment;

  public fetching = false;
  public end = false;
  private skip = 0;
  private limit = 5;

  public DateTime = DateTime;
  public turf = turf;


  @ViewChild('scroll', { read: ElementRef })
  private scrollEl: ElementRef;

  constructor(private postService: PostService,
    private modalService: NgbModal,
    private userService: UserService) { }

  ngOnInit() {

    this.userService.user.subscribe(user => {
      this.user = user;
    })

    this.fetchPosts().subscribe();
    this.fetchDash().subscribe();
    this.fetchSuggestedUsers().subscribe();
  }



  @HostListener('window:scroll', [])
  onWindowScroll() {

    if(this.fetching) {
      return;
    }

    const element = this.scrollEl.nativeElement;

    const elementTop = $(element).offset().top;
    const elementBottom = elementTop + $(element).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    if (elementBottom > viewportTop && elementTop < viewportBottom) {
      this.fetchPosts().subscribe();
    }

  }

  fetchSuggestedUsers() {
    return this.userService.getSuggestedUsers()
      .map( (res: any[]) => {
        this.suggested = res.slice(0, 5);
      }).catch(err => {
        return Observable.empty();
      });
  }

  fetchDash() {
    return this.userService.getDash().map( res => {
      this.dashboard = res["myDashboard"];
      this.upcoming = res["upcomingServices"]

      if(this.upcoming) {
      this.upcoming.forEach(service => {
          service.time = DateTime.fromISO(service.serviceScheduleDate).toLocaleString();
      });
      }

    })
  }
  fetchPosts() {

    if(this.fetching) {
      Observable.empty();
    }

    this.fetching = true;

    return this.postService
      .getPosts(this.skip, this.limit)
      .map( (res: Array<any>) => {

        res.forEach(post => {
          if(!post.comments) {
            post.comments = [];
          }

          post.comments.forEach(comment => {
            comment.timeago = ta.ago(Date.parse(comment.updatedAt));
          });

          post.post.timeago = ta.ago(Date.parse(post.post.createdAt));
        })

        this.models = [...this.models, ...res];

        this.skip = this.skip + 5;
        console.log(this.models);
        this.fetching = false;
      })
      .catch(err => {
        this.fetching = false;
        this.end = true;
        return Observable.empty();
      });
  }

  sendComment(id, index) {
    if(this.comment && this.comment.length > 0) {
      this.postService.postComment(id, this.comment).subscribe(res => {

          this.models[index].comments.unshift({
            comment: this.comment,
            user: this.user,
            updatedAt: DateTime.utc(),
            timeago: ta.ago(DateTime.local())
          });

          this.models[index].post.countComments += 1;

          if(this.models[index].comments.length > 2) {
            this.models[index].comments.splice(-1, 1);
          }

          this.comment = "";
      });
    }
  }

  openClsModal(type, idx) {
    const modalRef = this.modalService.open(CommentLikeShareComponent);
    const clsComponent: CommentLikeShareComponent = modalRef.componentInstance as CommentLikeShareComponent;

    clsComponent.type = type;
    clsComponent.post_id = idx;
  }

  followUser(index, $event) {
    $event.stopPropagation();

    this.userService.follow(this.suggested[index]["userId"]).subscribe(res => {
      this.suggested.splice(index, 1);
    });
  }

  onLikePost(id, index) {

    let liked = true;

    if(this.models[index].liked) {
      liked = false;
    }

    this.postService.postLike(id, liked).subscribe(res => {
      this.models[index].liked = liked;
      if(liked) {
        this.models[index].post.countLikes += 1;
      } else {
        this.models[index].post.countLikes -= 1;
      }
    });
  }

  onPost(post) {
    console.log(post);
    this.models.unshift(post);
  }


}
