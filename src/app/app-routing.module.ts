import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";

import { ChatResolver } from "./routes/chat/chat.resolver";
import { FollowersResolver } from "./routes/followers/followers.resolver";
import { FollowingResolver } from "./routes/following/following.resolver";
import {
  ServiceReviewsResolver,
  ServiceDetailResolver,
  ServiceRelatedResolver
} from "./routes/service/service.resolver";

import { HomeComponent } from "./routes/home/home.component";
import { LandingComponent } from "./routes/landing/landing.component";
import { ProfileComponent } from "./routes/profile/profile.component";
import { ChatComponent } from "./routes/chat/chat.component";
import { UpdatesComponent } from "./routes/updates/updates.component";
import { ServiceComponent } from "./routes/service/service.component";
import { FollowersComponent } from "./routes/followers/followers.component";
import { CancelRequestComponent } from './routes/cancel-request/cancel-request.component';
import { FollowingComponent } from "./routes/following/following.component";
import { SettingComponent } from "./routes/setting/setting.component";
import { ResetpasswordComponent } from "./routes/resetpassword/resetpassword.component";
import { ServiceAddComponent } from "./routes/service/service-add/service-add.component";
import { ServiceDetailComponent } from "./routes/service/service-detail/service-detail.component";
import { BuyComponent } from "./routes/buy/buy.component";
import { SellComponent } from './routes/sell/sell.component';
import { GeneralComponent } from './routes/general/general.component';
import { ExploreJobsComponent } from './routes/explore-jobs/explore-jobs.component';
import { OfferDetailComponent } from './components/buy-sell/offer-detail/offer-detail.component';
import { OfferComponent } from './routes/offer/offer.component';
import { RequestDetailComponent } from './routes/request-detail/request-detail.component';
import { TransactionHistoryComponent } from './routes/transaction-detail/transaction-detail.component';
import { CheckoutComponent } from './routes/checkout/checkout.component';
import { AuthGuardService } from "./guards/auth-guard.service";
import { OrderFulfillmentFilesComponent } from './routes/order-fulfillment-files/order-fulfillment-files.component';
import { OrderFulfillmentScheduleComponent } from './routes/order-fulfillment-schedule/order-fulfillment-schedule.component';
import { OrderReviewComponent } from './routes/order-review/order-review.component';

const routes: Routes = [
  // { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '', component: LandingComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'setting/:tab', component: SettingComponent, canActivate: [AuthGuardService] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
  {
    path: 'chat',
    component: ChatComponent,
    resolve: { conversations: ChatResolver }
    , canActivate: [AuthGuardService]
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    resolve: { conversations: ChatResolver }
    , canActivate: [AuthGuardService]
  },
  { path: 'updates', component: UpdatesComponent, canActivate: [AuthGuardService] },
  {
    path: 'service0/:idService',
    component: ServiceComponent,
    resolve: {
      reviews: ServiceReviewsResolver,
      related: ServiceRelatedResolver,
      detail: ServiceDetailResolver
    }, canActivate: [AuthGuardService]
  },
  { path: 'service/add', component: ServiceAddComponent, canActivate: [AuthGuardService] },
  { path: 'service/detail/:id', component: ServiceDetailComponent, canActivate: [AuthGuardService] },
  // { path: 'followers', component: FollowersComponent, resolve: { followers: FollowersResolver } },
  // { path: 'following', component: FollowingComponent, resolve: { following: FollowingResolver } },
  { path: 'resetpassword/:email/:token', component: ResetpasswordComponent },
  { path: 'buy/:tab', component: BuyComponent, canActivate: [AuthGuardService] },
  { path: 'sell/:tab', component: SellComponent, canActivate: [AuthGuardService] },

  { path: 'offer/:id', component: OfferComponent, canActivate: [AuthGuardService] },
  { path: 'request/:id', component: RequestDetailComponent , canActivate: [AuthGuardService]},

  { path: 'general/:tab', component: GeneralComponent, canActivate: [AuthGuardService] },
  { path: 'explore/jobs', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'explore/live-offers', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'explore/live-offers/:id', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'transaction-history', component: TransactionHistoryComponent, canActivate: [AuthGuardService] },
  { path: 'order-fulfillment-detail', component: OrderFulfillmentFilesComponent, canActivate: [AuthGuardService] },
  { path: 'order-fulfillment', component: OrderFulfillmentScheduleComponent, canActivate: [AuthGuardService] },
  { path: 'order-review', component: OrderReviewComponent, canActivate: [AuthGuardService] },
  { path: 'cancel-request', component: CancelRequestComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    ChatResolver,
    FollowersResolver,
    FollowingResolver,
    ServiceReviewsResolver,
    ServiceRelatedResolver,
    ServiceDetailResolver,
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
})
export class AppRoutingModule {}
