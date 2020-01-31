import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './../../services/user.service';

import { Paginated } from './../../interfaces/paginated';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: any;
  hasMore: boolean;
  lastDocId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      const { docs, total, limit, page, lastDocId } = data.followers;
      this.hasMore = (total > limit * page);
      this.lastDocId = lastDocId;
      this.followers = docs;
    }, (err) => {
      this.hasMore = false;
      this.followers = [];
    });
  }

  onScroll() {
    if (!this.hasMore) return;

    this.hasMore = false;
    this.userService.getFollowers(this.lastDocId)
      .subscribe((data: any) => {
        const { docs, total, limit, page, lastDocId } = data;
        this.hasMore = (total > limit * page);
        this.lastDocId = lastDocId;
        this.followers = this.followers.concat(docs);
      }, (err) => {
        this.hasMore = false;
      });
  }

}
