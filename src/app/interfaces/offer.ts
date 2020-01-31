import {Location} from './location';
import {User} from './user';

export interface Offer {
  createdAt:	string;
  fulfillmentMethod: {};
  location: Location;
  seller: User,
  media: {
    fileName: string;
    mediaType: string;
  };
  description: string;
  price:	number;
  requestId:	number;
  serviceId:	number;
  updatedAt:	string;
  userId:	number;
  workDuration:	number;
  workDurationUom:	string;
}
