import { GeoJson } from './geojson';

export interface Location {
  city: string;
  country: string;
  geoJson: GeoJson;
  postalCode: string;
  province: string;
  state: string;
  _id: string;
}
