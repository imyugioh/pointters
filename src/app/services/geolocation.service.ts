import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

const publicIp = require("public-ip");
const iplocation = require("iplocation");

@Injectable()
export class GeolocationService {
  constructor() {}

  getCurrentLocation() {
    return Observable.fromPromise(
      publicIp.v4().then(ip => {
          return iplocation(['https://ipapi.co/*/json'], ip)
      })
    ).map( (res: any) => {

      if(!res.postalCode || res.postal == "") {
        res.postal = "0";
      }

      return {
        city: res.city,
        country: res.country_name,
        geoJson: {
          type: "Point",
          coordinates: [res.latitude, res.longitude]
        },
        postalCode: res.postal,
        province: res.region,
        state: res.region_code
      };
    });
  }
}
