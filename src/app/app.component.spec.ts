import { TestBed, async }      from '@angular/core/testing';
import { RouterModule }        from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { FacebookModule }      from 'ngx-facebook';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxCarouselModule } from 'ngx-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }        from './app.component';

import { AppRoutingModule }    from './app-routing.module';


import { HeaderComponent }  from './components/header/header.component';
import { NavComponent }     from './components/nav/nav.component';
import { SearchDropdownComponent }       from './components/search-dropdown/search-dropdown.component';
import { MessageDropdownComponent }      from './components/message-dropdown/message-dropdown.component';
import { NotificationDropdownComponent } from './components/notification-dropdown/notification-dropdown.component';
import { MenuDropdownComponent }         from './components/menu-dropdown/menu-dropdown.component';
import { SigninComponent }          from './components/signin/signin.component';
import { SignupComponent }          from './components/signup/signup.component';
import { ForgotPasswordComponent }  from './components/forgot-password/forgot-password.component';
import { PostingNewUpdateComponent }     from './components/posting-new-update/posting-new-update.component';
import { ServiceRelatedComponent }  from './components/service-related/service-related.component';
import { ServiceReviewsComponent }  from './components/service-reviews/service-reviews.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatMessageOfferComponent } from './components/chat-message-offer/chat-message-offer.component';
import { ChatMessageServiceComponent } from './components/chat-message-service/chat-message-service.component';


import { AuthService }         from './services/auth.service';
import { UserService }         from './services/user.service'; 


import { HomeComponent }                 from './routes/home/home.component';
import { ChatComponent }                 from './routes/chat/chat.component';
import { UpdatesComponent }              from './routes/updates/updates.component';
import { ServiceComponent }              from './routes/service/service.component';
import { FollowersComponent }            from './routes/followers/followers.component';
import { FollowingComponent }            from './routes/following/following.component';
import { FollowSidebarComponent } from './components/follow-sidebar/follow-sidebar.component';
import { FollowersItemComponent } from './components/followers-item/followers-item.component';
import { FollowingItemComponent } from './components/following-item/following-item.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { SettingComponent } from './routes/setting/setting.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        NavComponent,
        MessageDropdownComponent,
        SearchDropdownComponent,
        NotificationDropdownComponent,
        MenuDropdownComponent,
        SigninComponent,
        SignupComponent,
        ForgotPasswordComponent,
        HomeComponent,
        ChatComponent,
        UpdatesComponent,
        ServiceComponent,
        FollowersComponent,
        FollowingComponent,
        PostingNewUpdateComponent,
        ServiceRelatedComponent,
        ServiceReviewsComponent,
        FollowSidebarComponent,
        FollowersItemComponent,
        FollowingItemComponent,
        ProfileComponent,
        SettingComponent,
        ChatMessageComponent,
        ChatMessageServiceComponent,
        ChatMessageOfferComponent
      ],
      imports: [
        AppRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        InfiniteScrollModule,
        FacebookModule.forRoot(),
        Ng4GeoautocompleteModule.forRoot(),
        NgxCarouselModule,
        NgbModule.forRoot()
      ],
      providers: [
        AuthService,
        UserService
      ]
    }).compileComponents();
  }));
  it('should create the app', (() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, (() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
