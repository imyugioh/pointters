import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { User } from './../../../interfaces/user';
import {environment} from './../../../../environments/environment';


@Component({
  selector: 'app-general-followers',
  templateUrl: './general-followers.component.html',
  styleUrls: ['./general-followers.component.css']
})
export class GeneralFollowersComponent implements OnInit {

  followers: any;
  hasMore: boolean;
  lastDocId: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getFollowers(this.lastDocId)
    .subscribe((data: any) => {
      console.log(data);
    
    }, (err) => {
      console.log(err);
    });
  }
}
