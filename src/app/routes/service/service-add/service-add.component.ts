import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgModule } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ServiceService } from "./../../../services/service.service";
import { NgxCarousel, NgxCarouselStore } from "ngx-carousel";
import { environment } from "./../../../../environments/environment";
import { Router } from "@angular/router";
import { User } from "./../../../interfaces/user";
import { UserService } from "./../../../services/user.service";
import { As3Service } from '../../../services/as3.service';

const uuid = require('uuid/v4');


@Component({
  selector: "app-service-add",
  templateUrl: "./service-add.component.html",
  styleUrls: ["./service-add.component.scss"]
})
export class ServiceAddComponent implements OnInit {
  @Output() successHandler = new EventEmitter<boolean>();

  public loading = false;
  slierShow: boolean = false;
  addPrice_opened: boolean = false;
  addMethod_opened: boolean = false;
  categories: any = [];
  categoriesTransfer: any = [];
  // = [
  //   {id: 1, name: "Home"},
  //   {id: 2, name: "Kitchen Repair"},
  //   {id: 3, name: "Furniture"},
  //   {id: 4, name: "Auto"},
  //   {id: 5, name: "Full Body"}
  //   ];
  service: any = {
    category: { id: 1, name: "Home" },
    description: "",
    fulfillmentMethod: {
      local: false,
      online: false,
      shipment: false,
      store: false,
      localServiceRadius: 25,
      localServiceRadiusUom: "mile"
    },
    location: [
      {
        city: "Chicago",
        country: "US",
        geoJson: {
          type: "Point",
          coordinates: [-73.856077, 40.848447]
        },
        postalCode: "12345",
        province: "blah",
        state: "IL"
      }
    ],
    media: [{ fileName: "123.jpg", mediaType: "image" }],
    prices: []
  };

  // {
  //   currencyCode: "USD",
  //   currencySymbol: "$",
  //   description: "",
  //   price: 20,
  //   time: 1,
  //   timeUnitOfMeasure: "hour"
  //   } // price

  price_unit: any = {
    currencyCode: "USD",
    currencySymbol: "$",
    description: "",
    price: "",
    time: 1,
    timeUnitOfMeasure: "hour"
  };

  price_edit_save;

  price_edit_mode = -1;

  category = -1;
  weeks = 0;
  days = 0;
  hours = 1;
  error = "";
  public errorPrice = '';
  public errorDelivery = '';

  public tagline;

  // medias = [{fileName: "",  mediaType: ""},{fileName: "",  mediaType: ""},{fileName: "",  mediaType: ""},{fileName: "",  mediaType: ""},{fileName: "",  mediaType: ""},{fileName: "",  mediaType: ""},{fileName: "",  mediaType: ""},{fileName: "",  mediaType: ""},{fileName: "",  mediaType: ""},{fileName: "",  mediaType: ""}];
  public medias = [];

  public swiperConfig = {
    slidesPerView: 3,
    spaceBetween: 15,
    breakpoints: {
      400: {
        slidesPerView: 3,
        spaceBetween: 15
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      800: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  };

  user: User;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private serviceService: ServiceService,
    private router: Router,
    private userService: UserService,
    private as3Service: As3Service,
  ) {}

  ngOnInit() {
    this.error = "";
    // carousel

    // get getogory
    let catego = this.serviceService.getCategories().subscribe(
      (res: { categories: any[] }) => {
        console.log(res);
        let categoriesAll = res.categories;
        let i = 1;
        categoriesAll.forEach(element => {
          i++;
          this.categories.push({
            id: element._id,
            name: element.name,
            sub: false
          });
          this.categoriesTransfer.push({ id: element._id, name: element.name });
          if (element.subCategories.length > 0) {
            element.subCategories.forEach(subElement => {
              this.categories.push({
                id: subElement._id,
                name: subElement.name,
                sub: true
              });
              this.categoriesTransfer.push({
                id: subElement._id,
                name: subElement.name
              });
            });
          }
        });
      },
      err => {}
    );
    // set user location
    this.user = { ...this.user };
    this.userService.user.subscribe(res => {
      this.user = res;
      // console.log(this.user);
    });
  }

  onCategory(index) {
    this.category = index;
  }

  onCancel() {
    this.error = "";
    this.activeModal.close();
  }

  onSave() {
    if (this.category == 0) {
      this.error = "Please select category.";
      return;
    }

    if(!this.tagline || this.tagline.length <= 0) {
      this.error = "Please entrer the tagline";
      return;
    }

    this.error = "";
    this.service.category = this.categoriesTransfer[this.category];

    let newMedia = [];
    this.medias.forEach(element => {
      if (element.fileName != "") {
        newMedia.push(element);
      }
    });
    if (newMedia.length == 0) {
      this.error = "Please upload media files.";
      return;
    }

    if (this.service.description == "") {
      this.error = "Please enter service description.";
      return;
    }



    let price_index_err = -1;


    this.service.prices.forEach((price, index) => {
      if (!price.description || price.description.length <= 0) {
        this.errorPrice = "Please enter price description.";
        price_index_err = index;
        return;
      }
    });

    if(price_index_err != -1) {
      this.onPriceEdit(price_index_err);
    }

    if(!this.service.fulfillmentMethod.online &&
      !this.service.fulfillmentMethod.shipment &&
      !this.service.fulfillmentMethod.store &&
      !this.service.fulfillmentMethod.local) {
        this.errorDelivery = "Please use at least one delivery method";
        return;
    } 

    
    this.service.media = newMedia;
    this.service.location = [this.user.location];
    this.service.tagline = this.tagline;

    this.serviceService.addService(this.service).subscribe(
      (res: { service }) => {
        this.activeModal.close();
        this.onDetail(res.service._id);
      },
      err => {
        console.log("Post new service ERROR");
      }
    );
  }

  makeid(text = "") {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  onUploadMedia(event) {

    const files: FileList = event.target.files;

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

    // setting loading indicator while uploading images
    this.loading = true;

    this.as3Service.uploadMedia(medias).subscribe(
      (res) => {

        this.medias = [ ...this.medias, ...medias.map( (media, index) => {
          return {
            mediaType: media.mediaType,
            fileName: res[index]['path'],
          };
        })];

        this.loading = false;
      }
    );



  }


  onRemoveImageItem(index) {
    this.medias.splice(index, 1);
  }

  onDetail(id) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

    const currentUrl = this.router.url + "?";

    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate(["/service/detail/" + id]);
    });
  }

  onOpenAddPrice() {
    this.addMethod_opened = false;
    if (this.addPrice_opened) {
      this.addPrice_opened = false;
    } else {
      this.addPrice_opened = true;
    }
    this.price_unit = {
      currencyCode: "USD",
      currencySymbol: "$",
      description: "",
      price: "",
      time: 1,
      timeUnitOfMeasure: "hour"
    };
    this.days = 0;
    this.weeks = 0;
    this.hours = 1;
  }

  onOpenMethod() {
    this.addMethod_opened = !this.addMethod_opened;
    this.addPrice_opened = false;
  }

  onOpenCategory() {
    this.addMethod_opened = false;
    this.addPrice_opened = false;
  }

  onPriceAdd() {
    if (this.price_unit.price > 0) {
      this.addPrice_opened = false;

      let times = 0;

      if (this.hours !== 0) {
        times = this.hours;
        this.price_unit.timeUnitOfMeasure = "hour";
      } else if (this.days !== 0) {
        times = this.days;
        this.price_unit.timeUnitOfMeasure = "day";
      } else if (this.weeks !== 0) {
        times = this.weeks;
        this.price_unit.timeUnitOfMeasure = "week";
      }

      this.price_unit.time = times;
      if (this.price_edit_mode > -1) {
        this.service.prices[this.price_edit_mode] = this.price_unit;
        this.price_edit_mode = -1;
      } else {
        this.service.prices.push(this.price_unit);
      }
    } else {
      this.price_unit.price = "";
      return;
    }
  }
  onPriceCancel() {
    this.addPrice_opened = false;

    this.days = 0;
    this.weeks = 0;
    this.hours = 1;

    if (this.price_edit_mode >= 0) {
      this.service.prices[this.price_edit_mode] = this.price_edit_save;
    }

    this.price_unit = {
      currencyCode: "USD",
      currencySymbol: "$",
      description: "",
      price: "",
      time: 1,
      timeUnitOfMeasure: "hour"
    };

    this.price_edit_mode = -1;
  }

  onPriceEdit(i) {
    this.errorPrice = "";
    this.price_edit_mode = i;
    this.price_unit = this.service.prices[i];
    this.price_edit_save = { ...this.service.prices[i] };

    this.addPrice_opened = true;
  }

  onDeliveryMethod(str) {
    this.errorDelivery = "";

    switch (str) {
      case "online":
        this.service.fulfillmentMethod.online = !this.service.fulfillmentMethod
          .online;
        break;
      case "shipment":
        this.service.fulfillmentMethod.shipment = !this.service
          .fulfillmentMethod.shipment;
        break;
      case "store":
        this.service.fulfillmentMethod.store = !this.service.fulfillmentMethod
          .store;
        break;
      case "local":
        this.service.fulfillmentMethod.local = !this.service.fulfillmentMethod
          .local;
        break;
      default:
        break;
    }
  }
}
