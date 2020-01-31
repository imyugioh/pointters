import { Location } from "./location";
import { Media } from "./media";

export interface Order {
  currencyCode?: string;
  currencySymbol?: string;
  totalAmount?: number;
  totalAmountBeforeDiscount?: number;
  orderMilestoneStatuses: OrderMilestoneStatuses;
  paymentDate: string;
  status?: string;
  serviceLocation: Location;
  media: Media;
  description: string;
  priceDescription: string;
  notificationCount: number;
}


export interface OrderMilestoneStatuses {
  _id: string;
  paid: boolean;
  paidDate: string;
  statusCode?: string;
  statusDescription?: string;
}