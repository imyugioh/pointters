import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../services/user.service";
import { User } from "./../../interfaces/user";
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";
import { ServiceService } from "./../../services/service.service";
import { ConversationService } from './../../services/conversation.service';
import { ServiceUnit } from "./../../interfaces/service-unit";
import { ActivatedRoute } from '@angular/router';
import { NgZone } from '@angular/core';

const uuid = require('uuid/v4');

import turf from '@turf/distance';
import { As3Service } from "../../services/as3.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap/modal/modal";
import { ServiceAddComponent } from "../service/service-add/service-add.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: any;
  location: string = "";
  private services: ServiceUnit[];
  private docs: any;
  service: any = [];
  reviews: any = [];
  seller: any = [];
  serviceMetrics: any = [];
  private data: any;
  serviceError = false;
  private userId: string = "";
  userProfileDetails: any;
  userProfileLoaded: boolean = false;
  userServicesLoaded: boolean = false;
  total: number = 0;
  lastDocId: string;
  pages: number;
  page: number;
  public currentUser;

  public turf = turf;

  public swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 15,
    breakpoints: {
      400: {
        slidesPerView: 1,
        spaceBetween: 15
      },
      600: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      800: {
        slidesPerView: 1,
        spaceBetween: 30
      }
    }
  };

  constructor(

    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private servicesService: ServiceService,
    private route: ActivatedRoute,
    private as3Service: As3Service,
    private modalService: NgbModal,
    private conversationService: ConversationService,

    lc: NgZone
  ) {

    this.userService.user.subscribe(user => {
      this.currentUser = user;
    })

    this.userId = route.snapshot.params["id"];
    console.log(this.userId + " selected");
    window.onscroll = () => {
      let status = "not reached";
      let windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      let body = document.body,
        html = document.documentElement;
      let docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      let windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        status = "bottom reached";
        this.getNewItems();
      }
      lc.run(() => {
        // this.statusText = status;
      });
    };
  }

  ngOnInit() {
    this.docs = [];
    this.userProfileLoaded = false;
    this.userServicesLoaded = false;
    if (this.userId == "me") {
      this.userService.user.subscribe(user => {
        if (user) {
          let user_data = user;
          this.userId = user_data._id;
          this.getProfileDetail();
        }
      });
    } else {
      this.getProfileDetail();
    }

    // this.userProfileDetails = this.userService.get();
  }

  getNewItems() {
    if (this.page < this.pages) {
      console.log("new page calling");
      let newServices;
      this.servicesService.getServices("", this.lastDocId).subscribe(
        res => {
          newServices = res.docs;
          console.log(res);
          this.lastDocId = res.lastDocId;
          this.page = res.page;
          this.pages = res.pages;
          let i = 0;
          newServices.forEach(element => {
            if (newServices[i].service.description.length > 20) {
              newServices[i].service.description =
                newServices[i].service.description.substring(0, 20) + "...";
            }

            this.docs.push(newServices[i]);
            i++;
          });
        },
        err => {}
      );
    }
  }

  getProfileDetail() {
    this.userService.getUserProfile(this.userId).subscribe(
      res => {
        this.user = res.result;
        this.userProfileLoaded = true;
        if (this.user.location)
          this.location =
            this.user.location.city +
            " " +
            this.user.location.state;
        // set services
        this.docs = [];
        this.docs = this.servicesService.getServices(this.user.id).subscribe(
          res => {
            this.docs = res.docs;
            console.log(res);
            this.userServicesLoaded = true;
            this.total = res.total;
            this.lastDocId = res.lastDocId;
            this.pages = res.pages;
            this.page = res.page;
            let i = 0;
            this.docs.forEach(element => {
              if (this.docs[i].service.description.length > 20) {
                this.docs[i].service.description =
                  this.docs[i].service.description.substring(0, 20) + "...";
              }
              i++;
            });
          },
          err => {
            this.userServicesLoaded = true;
          }
        );
      },
      err => {
        this.userProfileLoaded = true;
      }
    );
  }

  openAddService() {
    const modalRef = this.modalService.open(ServiceAddComponent);

  }

  onSellerProfile(sellerId) {
    const currentUrl = this.router.url + "?";
    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate(["/profile/" + sellerId]);
    });
  }

  onUploadBackground(event) {

    const files: FileList = event.target.files;

    console.log("test");
    if(files.length == 0) {
      return;
    }

    const medias = Array.from(files).map( (file, index, arr) => {

      return {
        file: file,
        fileName: uuid(),
        mediaType: file.type.split('/')[0],
      };
    });


    this.as3Service.uploadMedia(medias).subscribe(
      (res) => {

        let media = [ ...medias.map( (media, index) => {
          return {
            mediaType: media.mediaType,
            fileName: res[index]['path'],
          };
        })];

        this.userService.update({
          ...this.user,
          profileBackgroundMedia: media
        }).subscribe(res => {

        });

      }
    );
  }

  getDistance(coordinates1) {
    return (
      this.getDistanceFromLatLonInKm(
        coordinates1[0],
        coordinates1[1],
        this.user.location.geoJson.coordinates[0],
        this.user.location.geoJson.coordinates[1]
      ) + " km"
    );
  }
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distace in km
    return Math.floor(d);
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  openChat() {
    this.conversationService.currentChatPartner = this.user;
    this.router.navigateByUrl('/chat/' + this.user.id);
  }
}
