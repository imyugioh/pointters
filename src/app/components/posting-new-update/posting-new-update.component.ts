import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
require('aws-sdk');
const uuid = require('uuid/v4');
var ta = require('time-ago')  // node.js
import { DateTime } from 'luxon';
import turf from '@turf/distance';

import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { PostService } from './../../services/post.service';
import { SearchService } from './../../services/search.service';
import { As3Service } from './../../services/as3.service';

import { Post } from './../../interfaces/post';
import { Tag } from './../../interfaces/tag';
import { User } from '../../interfaces/user';
import { MediaUpload } from '../../interfaces/media-upload';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-posting-new-update',
  templateUrl: './posting-new-update.component.html',
  styleUrls: ['./posting-new-update.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PostingNewUpdateComponent implements OnInit {

  public user: User;
  public tag;
  public medias: any[] = [];

  public DateTime = DateTime;
  public turf = turf;


  public tagInput = new EventEmitter<string>();
  public tagList;
  public message;


  @Output()
  private onPostE: EventEmitter<any> = new EventEmitter();


  public loading = false;
  public loadingTags = true;
  public showMessageError = null;

  public isEditing: boolean;


  public swiperConfig = {
    slidesPerView: 2,
    spaceBetween: 15,
    breakpoints: {
      400: {
        slidesPerView: 1,
        spaceBetween: 15
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      800: {
        slidesPerView: 2,
        spaceBetween: 30
      }
    },

    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',

  };

	isAddtags: boolean;
	isPostingWithTags: boolean;
	isAddMoreTags: boolean;
  isServiceProvider: boolean;
  form   : FormGroup;
  tags: Tag[];

  constructor(
    private authService: AuthService,
    public userService: UserService,
    private postService: PostService,
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private as3Service: As3Service,
  ) { }

  ngOnInit() {
    this.isEditing = false;

    this.userService.user.subscribe(user => {
      this.user = user;
    });

    this.tagInput.filter(value => {
      if(value == null || value.length <= 0) {
        this.tagList = null;
        return false;
      }

      return true;
    })
    .distinctUntilChanged()
    .debounceTime(600)
    .switchMap(val => {
      this.loadingTags = true;
      this.tagList = null;

      return this.postService.getPostsTag(val)
        .catch(err => { this.loadingTags = false; return Observable.empty() });
    }).catch(err => {
      this.loading = false;
      return Observable.empty();
    }).subscribe(val => {
      this.tagList = val;
      this.loadingTags = false;
    });

  }

  onUploadMedia(event) {
    this.isEditing = true;
    const files: FileList = event.target.files;

    if(files.length == 0) {
      return;
    }

    const medias = Array.from(files).map( (file, index, arr) => {

      return {
        file: file,
        fileName: uuid(),
        type: file.type,
      };
    });

    // setting loading indicator while uploading images
    this.loading = true;

    this.as3Service.uploadMedia(medias).subscribe(
      (res) => {

        this.medias = [ ...this.medias, ...medias.map( (media, index) => {
          return {
            type: media.type,
            path: res[index]['path'],
          };
        })];

        this.loading = false;
      }
    );

  }

  onPost() {

    if(this.message == null || this.message.length == 0) {
      this.showMessageError = true;
      return;
    }

    const message: any = {
      message: this.message,
      type: 'service',
    };

    if (this.medias && this.medias.length > 0) {
      message['media'] = this.medias.map(value => {
        return {
          mediaType: value.type.split("/")[0],
          fileName: value.path,
        };
      });
    }

    if (this.tag && this.tag.type == 'service') {
      message['tags'] =  [ {
        type: this.tag.type,
        id: this.tag.service.id
      }];
    } else if(this.tag && this.tag.type == 'user') {
      message['tags'] =  [ {
        type: this.tag.type,
        id: this.tag.user.id
      }];
    }

    this.postService.createPost(message).subscribe(res => {

      let emitted = {
        post: {
          ...res['post'],
          id: res['post']['_id'],
          countComments: 0,
          countLikes: 0,
          countShares: 0,
          timeago: 'a moment ago',
        },
        comments: [],
        user: this.user,
      }

      console.log(this.tag)

      if(this.tag) {
        if(this.tag.type == 'service') {
          emitted.post.tags =  [ {
            ...this.tag.service,
            type: 'service',
            media: this.tag.service.media[0],
          }];
        }

        else if(this.tag.type == 'user') {
          emitted.post.tags = [ {
            ...this.tag.user,
            userId: this.tag.user.userId,
            type: 'user',
          }];
        }
      }

      console.log(emitted);
      this.onPostE.emit(emitted);

      this.tag = null;
      this.medias = [];
      this.message = "";
      this.isEditing = false;
      this.tagList = null;
    });
  }

  onRemoveMedia(index) {
    this.medias.splice(index, 1);
  }

  onWrite() {
    this.showMessageError = false;
    this.isEditing = true;
  }


}
