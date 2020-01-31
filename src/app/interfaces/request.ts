import { Media } from "./media";

export interface Request {
  id: string;
  description: string;
  createdAt: string;
  media: Media[];
  numOffers: number;
  numNewOffers: number;
  low: number;
  high: number;
  expiresIn: number;
}
