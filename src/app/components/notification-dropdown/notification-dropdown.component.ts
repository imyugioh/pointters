import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paginated } from './../../interfaces/paginated';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { NotificationsService } from './../../services/notifications.service';
var moment = require('moment');

const defaultNotificationData: Paginated = {
  docs: [
    // {
    //       "activity": "you know on Facebook has joined",
    //       "id": "5aca8dec02c9086b70bc7507",
    //       "markedRead": false,
    //       "type": "fb_friend",
    //       "time": "2018-04-08T21:31:32.744Z",
    //       "names": "Matt D. and 5 others",
    //       "profilePic": "https://s3.amazonaws.com/pointters_dev/sample-user-images/adwggd_286532618_11.jpeg",
    //       "userId": "5a0ca9562e80107427875cd3"
    //   },
    //   {
    //       "activity": "followed you",
    //       "id": "5aca8d9802c9086b70bc7506",
    //       "markedRead": false,
    //       "type": "follow",
    //       "time": "2018-04-08T21:31:32.744Z",
    //       "names": "Matt D. and 5 others",
    //       "profilePic": "https://s3.amazonaws.com/pointters_dev/sample-user-images/adwggd_286532618_11.jpeg",
    //       "userId": "5a0ca9562e80107427875cd3"
    //   },
    //   {
    //       "activity": "liked, shared and commented your service",
    //       "id": "5aca8d4102c9086b70bc7504",
    //       "markedRead": true,
    //       "type": "service",
    //       "time": "2018-04-08T21:31:32.744Z",
    //       "names": "Kevin M. and 5 others",
    //       "profilePic": "https://s3.amazonaws.com/pointters_dev/sample-user-images/adwggd_286532618_24.jpeg",
    //       "serviceId": "5a029f15b37404568cb6f234",
    //       "media": {
    //           "fileName": "https://s3.amazonaws.com/pointters_dev/sample-service-images/service29.jpg",
    //           "mediaType": "image"
    //       }
    //   },
    //   {
    //      "activity": "shared and commented your post",
    //      "id": "5aca8b4702c9086b70bc74fe",
    //      "markedRead": false,
    //      "type": "post",
    //      "time": "2018-04-08T21:31:32.744Z",
    //      "names": "Gregory M. and 5 others",
    //      "profilePic": "https://s3.amazonaws.com/pointters_dev/sample-user-images/adwggd_286532618_18.jpeg",
    //      "postId": "5ac6bfe2a31e1657817983d8",
    //      "media": {
    //          "_id": "5ac6bfe2a31e1657817983d9",
    //          "mediaType": "image",
    //          "fileName": "https://s3.amazonaws.com/pointters_dev/dev/post_pic06983231C-E119-4014-8623-DBE407646995"
    //      }
    //  }
  ],
  limit: 0,
  page: 0,
  pages: 0,
  total: 0
};


@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.css']
})
export class NotificationDropdownComponent implements OnInit {

  notifications: Paginated = defaultNotificationData;
  scrollbarWidth: number = 0;
  moment: any = moment;


  verticalScrollOverlayStyle: any = {};
  horizontalScrollOverlayStyle: any = {};


  constructor(
    private authService: AuthService,
    public userService: UserService,
    private notificationsService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getNotifications();
    this.userService.user.subscribe(user => {
      if (user) {
        this.getNotifications(); 
      }

    });
  }


  getNotifications(lastId?: string) {
    this.scrollbarWidth = this.notificationsService.getScrollbarWidth();

    // apply browser specific styles for scrollbars
    this.verticalScrollOverlayStyle = {
      'width': this.scrollbarWidth + 'px',
    };
    this.horizontalScrollOverlayStyle = {
      'margin-top': -this.scrollbarWidth + 'px'
    }

    this.notificationsService.get(lastId)
      .subscribe((res: Paginated) => {
        if (!res || !res.docs) return;
        if (lastId) {
          let newNotifications = res;
          newNotifications.docs = this.notifications.docs.concat(newNotifications.docs);
          this.notifications = newNotifications;
        } else {
          this.notifications = res;
        }

      })
  }

  loadOlderNotifications() {
    let lastId = this.notifications.lastDocId;
    if (!lastId) return;
    this.getNotifications(lastId);
  }

  clickNotification(item) {
    this.notificationsService.readNotification(item.id)
      .subscribe(res => {
        let link = "";
        if (item.serviceId) link = '/service/detail/' + item.serviceId;
        if (item.postId) link = '/post/' + item.postId;
        if (item.userId) link = '/profile/' + item.userId;

        if (link) this.router.navigateByUrl(link);
      })


  }

}
