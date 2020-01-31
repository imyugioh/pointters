import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './../../services/user.service';

import { Paginated } from './../../interfaces/paginated';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  followings: any;
  hasMore: boolean;
  lastDocId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      const { docs, total, limit, page, lastDocId } = data.following;
      this.hasMore = (total > limit * page);
      this.lastDocId = lastDocId;
      this.followings = docs;
    }, (err) => {
      this.hasMore = false;
      this.followings = [];
    });
  }

  onScroll() {
    if (!this.hasMore) return;

    this.hasMore = false;
    this.userService.getFollowing(this.lastDocId)
      .subscribe((data: any) => {
        const { docs, total, limit, page, lastDocId } = data;
        this.hasMore = (total > limit * page);
        this.lastDocId = lastDocId;
        this.followings = this.followings.concat(docs);
      }, (err) => {
        this.hasMore = false;
      });
  }

}
