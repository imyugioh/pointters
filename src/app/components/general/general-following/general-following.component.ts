import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { User } from './../../../interfaces/user';
import {environment} from './../../../../environments/environment';


@Component({
  selector: 'app-general-following',
  templateUrl: './general-following.component.html',
  styleUrls: ['./general-following.component.css']
})
export class GeneralFollowingComponent implements OnInit {
  
  followings: any;
  hasMore: boolean;
  lastDocId: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getFollowing(this.lastDocId)
    .subscribe((data: any) => {
      console.log(data);
      const { docs, total, limit, page, lastDocId } = data;
      this.hasMore = (total > limit * page);
      this.lastDocId = lastDocId;
      this.followings = this.followings.concat(docs);
    }, (err) => {
      console.log(err);
      this.hasMore = false;
    });
  }

}
