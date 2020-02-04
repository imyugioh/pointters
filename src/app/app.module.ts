import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }     from '@angular/common/http';
import { ReactiveFormsModule }  from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgSpinKitModule } from 'ng-spin-kit';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


import { FacebookModule }       from 'ngx-facebook';
import { NgxCarouselModule } from 'ngx-carousel';
import { ShareModule } from '@ngx-share/core';
import { ShareButtonModule } from '@ngx-share/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule } from 'ng-socket-io';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgDatepickerModule } from 'ng2-datepicker';
import { EmojiModule } from 'angular-emojione';
import { TextMaskModule } from 'angular2-text-mask';
import { NouisliderModule } from 'ng2-nouislider';

import 'hammerjs';

import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }             from './app.component';
import { HomeComponent }            from './routes/home/home.component';
import { HeaderComponent }          from './components/header/header.component';
import { NavComponent }             from './components/nav/nav.component';
import { SigninComponent }          from './components/signin/signin.component';
import { SignupComponent }          from './components/signup/signup.component';
import { ForgotPasswordComponent }  from './components/forgot-password/forgot-password.component';

import { AuthService }         from './services/auth.service';
import { UserService }         from './services/user.service';
import { ConversationService } from './services/conversation.service';
import { ServiceService }      from './services/service.service';
import { PostService }         from './services/post.service';
import { SearchService }       from './services/search.service';
import { BuyService }          from './services/buy.service';
import { OfferService }          from './services/offer.service';
import { OrderService }          from './services/order.service';
import { RequestService }          from './services/request.service';
import { JobService }          from './services/job.service';
import { GeolocationService }          from './services/geolocation.service';
import { As3Service }          from './services/as3.service';
import { ChatService }         from './services/chat.service';
import { NotificationsService } from './services/notifications.service';
import { ExploreJobsService } from './services/explore-jobs.service';
import { ExploreLiveOffersService } from './services/explore-live-offers.service';
import { CheckoutService } from './services/checkout.service';

import { AuthInterceptor } from './interceptor/auth-interceptor.service';
import { AuthGuardService } from './guards/auth-guard.service';


import { environment }         from './../environments/environment';

import { NgGapiClientConfig }            from './interfaces/ng-gapi-client-config';
import { ChatComponent }                 from './routes/chat/chat.component';
import { SearchDropdownComponent }       from './components/search-dropdown/search-dropdown.component';
import { MessageDropdownComponent }      from './components/message-dropdown/message-dropdown.component';
import { NotificationDropdownComponent } from './components/notification-dropdown/notification-dropdown.component';
import { MenuDropdownComponent }         from './components/menu-dropdown/menu-dropdown.component';
import { UpdatesComponent }              from './routes/updates/updates.component';
import { PostingNewUpdateComponent }     from './components/posting-new-update/posting-new-update.component';
import { FollowersComponent }            from './routes/followers/followers.component';
import { FollowingComponent }            from './routes/following/following.component';
import { ServiceComponent }              from './routes/service/service.component';
import { ServiceRelatedComponent } from './components/service-related/service-related.component';
import { ServiceReviewsComponent } from './components/service-reviews/service-reviews.component';
import { FollowSidebarComponent } from './components/follow-sidebar/follow-sidebar.component';
import { FollowingItemComponent } from './components/following-item/following-item.component';
import { FollowersItemComponent } from './components/followers-item/followers-item.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { SettingComponent } from './routes/setting/setting.component';
import { EditProfileComponent } from './components/settings/edit-profile/edit-profile.component';
import { EditAccountComponent } from './components/settings/edit-account/edit-account.component';
import { EditPaymentComponent } from './components/settings/edit-payment/edit-payment.component';
import { EditNotificationComponent } from './components/settings/edit-notification/edit-notification.component';
import { EditPrivacyComponent } from './components/settings/edit-privacy/edit-privacy.component';
import { EditPasswordComponent } from './components/settings/edit-password/edit-password.component';
import { LandingComponent } from './routes/landing/landing.component';
import { ResetpasswordComponent } from './routes/resetpassword/resetpassword.component';
import { ServiceAddComponent } from './routes/service/service-add/service-add.component';
import { ServiceEditComponent } from './routes/service/service-edit/service-edit.component';
import { CommentLikeShareComponent } from './components/comment-like-share/comment-like-share.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { JobDetailModalComponent } from './components/buy-sell/job-detail/job-detail.component';
import { SendOfferModalComponent } from './components/buy-sell/send-offer-modal/send-offer-modal.component';

import { CancelRequestComponent } from './routes/cancel-request/cancel-request.component';
import { OrderFulfillmentScheduleComponent } from './routes/order-fulfillment-schedule/order-fulfillment-schedule.component';
import { OrderFulfillmentFilesComponent } from './routes/order-fulfillment-files/order-fulfillment-files.component';
import { OrderReviewComponent } from './routes/order-review/order-review.component';
import { LiveOffersSliderComponent } from './routes/explore-live-offers/explore-live-offers-slider.component';
import { LiveOffersTimepickerComponent } from './routes/explore-live-offers/explore-live-offers-timepicker.component';
import { CheckoutComponent } from './routes/checkout/checkout.component';
import { ServiceDetailComponent } from './routes/service/service-detail/service-detail.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { TransactionHistoryComponent } from './routes/transaction-detail/transaction-detail.component';
import { BuyComponent } from './routes/buy/buy.component';
import { SellComponent } from './routes/sell/sell.component';
import { MapContentComponent } from './routes/explore-jobs/explore-jobs-map.component';
import { ExploreJobsComponent } from './routes/explore-jobs/explore-jobs.component';
import { ExploreLiveOffersComponent } from './routes/explore-live-offers/explore-live-offers.component';
import { BuyOrdersComponent } from './components/buy-sell/buy/buy-orders/buy-orders.component';
import { BuyOffersComponent } from './components/buy-sell/buy/buy-offers/buy-offers.component';
import { BuyRequestComponent } from './components/buy-sell/buy/buy-request/buy-request.component';
import { BuyWatchingComponent } from './components/buy-sell/buy/buy-watching/buy-watching.component';
import { BuyLikesComponent } from './components/buy-sell/buy/buy-likes/buy-likes.component';
import { BuySidebarComponent } from './components/buy-sell/buy/buy-sidebar/buy-sidebar.component';
import { SellOrdersComponent } from './components/buy-sell/sell/sell-orders/sell-orders.component';
import { SellSellerComponent } from './components/buy-sell/sell/sell-seller/sell-seller.component';
import { SellOffersComponent } from './components/buy-sell/sell/sell-offers/sell-offers.component';
import { SellJobComponent } from './components/buy-sell/sell/sell-job/sell-job.component';
import { SellMembershipComponent } from './components/buy-sell/sell/sell-membership/sell-membership.component';
import { SellCheckComponent } from './components/buy-sell/sell/sell-check/sell-check.component';
import { SellCheckFormComponent } from './components/buy-sell/sell/sell-check-form/sell-check-form.component';
import { SellVerificationComponent } from './components/buy-sell/sell/sell-verification/sell-verification.component';
import { SellLocationComponent } from './components/buy-sell/sell/sell-location/sell-location.component';
import { SellSidebarComponent } from './components/buy-sell/sell/sell-sidebar/sell-sidebar.component';
import { GeneralComponent } from './routes/general/general.component';
import { GeneralFollowingComponent } from './components/general/general-following/general-following.component';
import { GeneralFollowersComponent } from './components/general/general-followers/general-followers.component';
import { GeneralInviteComponent } from './components/general/general-invite/general-invite.component';
import { GeneralSidebarComponent } from './components/general/general-sidebar/general-sidebar.component';
import { TruncateNumberPipe } from './pipes/truncate-number.pipe';
import { TruncateToWordPipe } from './pipes/truncate-to-word.pipe';
import { OfferDetailComponent } from './components/buy-sell/offer-detail/offer-detail.component';
import { OfferComponent } from './routes/offer/offer.component';
import { RequestDetailComponent } from './routes/request-detail/request-detail.component';
import { RequestDetailContentComponent } from './components/buy-sell/request-detail-modal/request-detail-content.component';
import { RequestDetailModalComponent } from './components/buy-sell/request-detail-modal/request-detail-modal.component';
import { CalcDistancePipe } from './pipes/calc-distance.pipe';
import { SignupCredintalsComponent } from './components/signup/signup-credintals/signup-credintals.component';
import { SignupPersonalComponent } from './components/signup/signup-personal/signup-personal.component';
import { SpinnerComponent } from './components/utils/spinner/spinner.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatMessageOfferComponent } from './components/chat-message-offer/chat-message-offer.component';
import { ChatMessageServiceComponent } from './components/chat-message-service/chat-message-service.component';
import { ChatConversationComponent } from './components/chat-conversation/chat-conversation.component';
import { ChatSendServiceComponent } from './components/chat-send-service/chat-send-service.component';
import { ChatSendCustomOfferComponent } from './components/chat-send-custom-offer/chat-send-custom-offer.component';
import { ChatActionsDefaultViewComponent } from './components/chat-actions-default-view/chat-actions-default-view.component';
import { MapOverlayComponent } from './components/map-overlay/map-overlay.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';

import { OnlyNumberDirective } from './directives/only-number.directive';
import { MediaCarouselComponent } from './components/media-carousel/media-carousel.component';
import { AutoSizeDirective } from './directives/autosize.directive';

// modules configuration
const gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.GOOGLE_OAUTH_CLIENT_ID,
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: [
  ].join(" ")
};

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};



@NgModule({
  declarations: [
    AutoSizeDirective,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ChatComponent,
    SearchDropdownComponent,
    MessageDropdownComponent,
    NotificationDropdownComponent,
    MenuDropdownComponent,
    UpdatesComponent,
    PostingNewUpdateComponent,
    FollowersComponent,
    FollowingComponent,
    ServiceComponent,
    ServiceRelatedComponent,
    ServiceReviewsComponent,
    FollowSidebarComponent,
    FollowingItemComponent,
    FollowersItemComponent,
    ProfileComponent,
    SettingComponent,
    EditProfileComponent,
    EditAccountComponent,
    EditPaymentComponent,
    EditNotificationComponent,
    EditPrivacyComponent,
    EditPasswordComponent,
    LandingComponent,
    ResetpasswordComponent,
    ServiceAddComponent,
    ServiceDetailComponent,
    BuyComponent,
    SellComponent,
    BuyOrdersComponent,
    BuyOffersComponent,
    BuyRequestComponent,
    BuyWatchingComponent,
    BuyLikesComponent,
    BuySidebarComponent,
    SellOrdersComponent,
    SellSellerComponent,
    SellOffersComponent,
    SellJobComponent,
    SellMembershipComponent,
    SellCheckComponent,
    SellCheckFormComponent,
    SellVerificationComponent,
    SellLocationComponent,
    SellSidebarComponent,
    GeneralComponent,
    GeneralFollowingComponent,
    GeneralFollowersComponent,
    GeneralInviteComponent,
    GeneralSidebarComponent,
    OfferDetailComponent,
    SpinnerComponent,
    SignupCredintalsComponent,
    SignupPersonalComponent,
    OfferComponent,
    RequestDetailComponent,
    RequestDetailModalComponent,
    ServiceEditComponent,
    CommentLikeShareComponent,
    ChatMessageComponent,
    ChatMessageOfferComponent,
    ChatMessageServiceComponent,
    ChatConversationComponent,
    ExploreJobsComponent,
    ChatSendServiceComponent,
    ChatSendCustomOfferComponent,
    ChatActionsDefaultViewComponent,
    MapContentComponent,
    ExploreLiveOffersComponent,
    MapOverlayComponent,
    LiveOffersTimepickerComponent,
    LiveOffersSliderComponent,
    ShippingFormComponent,
    TransactionHistoryComponent,
    JobDetailModalComponent,
    RequestDetailContentComponent,
    SendOfferModalComponent,
    CheckoutComponent,
    ImageModalComponent,
    OrderReviewComponent,
    OrderFulfillmentFilesComponent,
    OrderFulfillmentScheduleComponent, 
    CancelRequestComponent,

    // pipes
    TruncateNumberPipe,
    TruncateToWordPipe,
    CalcDistancePipe,

    // directives
    OnlyNumberDirective,

    MediaCarouselComponent,


  ],
  entryComponents: [
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetpasswordComponent,
    ServiceAddComponent,
    ServiceEditComponent,
    CommentLikeShareComponent,

    JobDetailModalComponent,
    OfferDetailComponent,
    SendOfferModalComponent,
    RequestDetailModalComponent,
    ImageModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FacebookModule.forRoot(),
    NgbModule.forRoot(),
    Ng4GeoautocompleteModule.forRoot(),
    NgxCarouselModule,
    SocketIoModule,
    InfiniteScrollModule,
    ClickOutsideModule,
    NgDatepickerModule,
    EmojiModule,
    TextMaskModule,
    NouisliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXXs0ffiEUwezYMWE4-08uXX558hZ88W0' //'AIzaSyAm5XiUoP1swNgmUhouBdH1pVdB2PfkI3o'
    }),
    NgSpinKitModule,
    SwiperModule,
    ShareModule.forRoot(),
    ShareButtonModule.forRoot(),
    NgSelectModule,
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [
    AuthService,
    UserService,
    ConversationService,
    ServiceService,
    PostService,
    SearchService,
    BuyService,
    OfferService,
    OrderService,
    RequestService,
    JobService,
    AuthGuardService,
    GeolocationService,
    As3Service,
    NotificationsService,
    ExploreJobsService,
    ExploreLiveOffersService,
    GoogleMapsAPIWrapper,
    CheckoutService,

    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },

    // interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {

 }
