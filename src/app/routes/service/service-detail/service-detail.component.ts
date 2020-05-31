import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./../../../services/auth.service";
import { UserService } from "./../../../services/user.service";
import { ConversationService } from "./../../../services/conversation.service";
import { Router } from '@angular/router';
import { ServiceService } from "./../../../services/service.service";
import { NgxCarousel, NgxCarouselStore } from "ngx-carousel";
import { AgmCoreModule } from "@agm/core";
import { User } from "./../../../interfaces/user";
import { ServiceEditComponent } from "../service-edit/service-edit.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-service-detail',
  templateUrl: "./service-detail.component.html",
  styleUrls: ["./service-detail.component.scss"]
})
export class ServiceDetailComponent implements OnInit {
  public carouselBanner: NgxCarousel;
  serviceId: string = "";
  currentService: any;

  private data: any;
  service: any;
  reviews: any;
  seller: any;
  serviceMetrics: any;
  private buyCount: any = [];
  private totalBuyAmount = 0;
  lat: number = 51.678418;
  lng: number = 7.809007;
  relatedServices: any;
  serviceReviews: any;
  relatedServicesDetails: any = null;

  onShare: boolean = false;
  onLike: boolean = false;
  onWatch: boolean = false;
  private user: User;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private serviceService: ServiceService,
    private userService: UserService,
    private modalService: NgbModal,
    private conversationService: ConversationService
  ) {
    // this.serviceId = route.snapshot.params['id'];
    this.relatedServicesDetails = { ...this.relatedServicesDetails };
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.userService.user.subscribe(res => {
        this.user = res;
      });
      // get service detail
      this.serviceId = this.route.snapshot.params["id"];
      this.getServiceDetail().subscribe();
      this.serviceService
        .getLike(this.serviceId)
        .subscribe((res: { liked }) => {
          this.onLike = res.liked;
        });
      this.serviceService
        .getWatch(this.serviceId)
        .subscribe((res: { watched }) => {
          this.onWatch = res.watched;
        });
      window.scrollTo(0, 0);

      // carousel Banner
      this.carouselBanner = {
        grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
        slide: 1,
        speed: 400,
        interval: 4000,
        point: {
          visible: false,
          pointStyles: `
                .ngxcarouselPoint {
                  list-style-type: none;
                  text-align: center;
                  padding: 12px;
                  margin: 0;
                  white-space: nowrap;
                  overflow: auto;
                  position: absolute;
                  width: 100%;
                  bottom: 20px;
                  left: 0;
                  box-sizing: border-box;
                }
                .ngxcarouselPoint li {
                  display: inline-block;
                  border-radius: 999px;
                  background: rgba(255, 255, 255, 0.55);
                  padding: 5px;
                  margin: 0 3px;
                  transition: .4s ease all;
                }
                .ngxcarouselPoint li.active {
                    background: white;
                    width: 10px;
                }
              `
        },
        load: 2,
        loop: true,
        touch: true
      };
      // get related services
      this.serviceService.getRelated(this.serviceId).subscribe(
        res => {
          this.relatedServices = res.docs;
          console.log("related services");
          console.log(res);
          let i = 0;
          this.relatedServices.forEach(element => {
            if (this.relatedServices[i].service.description.length > 20) {
              this.relatedServices[i].service.description =
                this.relatedServices[i].service.description.substring(0, 20) +
                "...";
            }
            i++;
          });
        },
        err => {}
      );
      // get reviews
      this.serviceService.getReviews(this.serviceId).subscribe(
        res => {
          this.serviceReviews = res;
          this.reviews = res["docs"];
          // console.log(res);
        },
        err => {}
      );
    });
  }


  open(content) {
    this.modalService.open(content);
  }


  getServiceDetail() {
    return this.serviceService.getDetail(this.serviceId).map(
      res => {
        this.data = res;

        this.service = this.data.result.service;
        this.seller = this.data.result.seller;
        this.service.prices.forEach(element => {
          this.buyCount.push(0);
        });
        this.serviceMetrics = this.data.result.serviceMetrics;
        // console.log(this.data.result);
        this.lat = this.service.location[0].geoJson.coordinates[0];
        this.lng = this.service.location[0].geoJson.coordinates[1];
      },
      err => {}
    );
  }

  onAction(str) {
    switch (str) {
      case 'share':
        this.onShare = !this.onShare;
        this.DoShare();
        break;
      case 'like':
        this.onLike = !this.onLike;
        this.DoLike();
        break;
      default:
        this.onWatch = !this.onWatch;
        this.DoWatch();
        break;
    }
  }



  DoShare() {
    if (this.onShare) {
      // this.serviceService.setShare(this.service.id).subscribe((res)=>{
      // });
    } else {
      // this.serviceService.removeShare(this.service.id).subscribe((res)=>{
      // });
    }
  }

  DoLike() {
    if (this.onLike) {
      this.serviceService.setLike(this.service.id).subscribe(res => {
        console.log(res);
      });
    } else {
      this.serviceService.removeLike(this.service.id).subscribe(res => {
        console.log(res);
      });
    }
  }

  DoWatch() {
    if (this.onWatch) {
      this.serviceService.setWatch(this.service.id).subscribe(res => {
        console.log(res);
      });
    } else {
      this.serviceService.removeWatch(this.service.id).subscribe(res => {
        console.log(res);
      });
    }
  }

  onChangeBuyCount(mode, i) {
    if (mode == 'up') {
      this.buyCount[i]++;
    } else {
      if (this.buyCount[i] > 0) {
        this.buyCount[i]--;
      }
    }
    i = 0;
    this.totalBuyAmount = 0;
    this.service.prices.forEach(element => {
      this.totalBuyAmount += element.price * this.buyCount[i];
      i++;
    });
  }

  onRelatedDetail(id) {
    const currentUrl = this.router.url + '?';
    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate(['/service/detail/' + id]);
    });
  }

  onSellerProfile(sellerId) {
    const currentUrl = this.router.url + '?';
    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate(['/profile/' + sellerId]);
    });
  }

  onEditService() {
    const modalRef = this.modalService.open(ServiceEditComponent);
    const serviceAddComponent : ServiceEditComponent = modalRef.componentInstance as ServiceEditComponent;

    serviceAddComponent.medias = [ ...this.service.media ];
    serviceAddComponent.description = this.service.description;
    serviceAddComponent.prices = [ ...this.service.prices ];
    serviceAddComponent.tagline = this.service.tagline;
    serviceAddComponent.id = this.service.id;
    serviceAddComponent.fulfillmentMethod = { ...this.service.fulfillmentMethod};

    serviceAddComponent.successHandler.subscribe(success => {
      this.getServiceDetail().subscribe();
    });

  }

  getDistance(coordinates1) {
    return (
      this.getDistanceFromLatLonInKm(
        coordinates1[0],
        coordinates1[1],
        this.user.location.geoJson.coordinates[0],
        this.user.location.geoJson.coordinates[1]
      ) + ' km'
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

  fetchReviews() {

    this.serviceService.getReviews(this.serviceId, this.serviceReviews["lastDocid"]).subscribe(
      res => {
        this.serviceReviews = res;
        this.reviews = [ ...this.reviews, res["docs"]];

      },
      err => {}
    );
  }

  openChat() {
    this.conversationService.currentChatPartner = this.seller;
    this.router.navigateByUrl('/chat/' + this.seller.userId);
  }

}
