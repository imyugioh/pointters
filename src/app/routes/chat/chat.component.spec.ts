import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule }    from './../../app-routing.module';
import { HttpClientModule }    from '@angular/common/http';

import { FacebookModule }      from 'ngx-facebook';

import { HomeComponent }                 from './../home/home.component';
import { UpdatesComponent }              from './../updates/updates.component';
import { ServiceComponent }              from './../service/service.component';
import { FollowersComponent }            from './../followers/followers.component';
import { FollowingComponent }            from './../following/following.component';
import { PostingNewUpdateComponent }     from './../../components/posting-new-update/posting-new-update.component';

import { ConversationService } from './../../services/conversation.service';
import { AuthService }         from './../../services/auth.service';

import { ServiceReviewsComponent }  from './../../components/service-reviews/service-reviews.component';
import { ServiceRelatedComponent }  from './../../components/service-related/service-related.component';


import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ChatComponent,
        HomeComponent ,
        UpdatesComponent,
        ServiceComponent,
        FollowersComponent,
        FollowingComponent,
        PostingNewUpdateComponent,
        ServiceReviewsComponent,
        ServiceRelatedComponent
      ],
      imports: [ 
        AppRoutingModule,
        HttpClientModule,
        FacebookModule.forRoot()
      ],
      providers: [ 
        ConversationService,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
