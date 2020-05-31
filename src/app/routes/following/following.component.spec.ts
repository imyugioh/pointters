import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent }                 from './../home/home.component';
import { AppRoutingModule }    from './../../app-routing.module';

import { FollowingComponent } from './following.component';
import { ChatComponent } from './../chat/chat.component';
import { UpdatesComponent }              from './../updates/updates.component';
import { ServiceComponent }              from './../service/service.component';
import { FollowersComponent } from './../followers/followers.component';
import { PostingNewUpdateComponent }     from './../../components/posting-new-update/posting-new-update.component';

import { ServiceReviewsComponent }  from './../../components/service-reviews/service-reviews.component';
import { ServiceRelatedComponent }  from './../../components/service-related/service-related.component';

describe('FollowingComponent', () => {
  let component: FollowingComponent;
  let fixture: ComponentFixture<FollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        FollowingComponent,
        HomeComponent,
        ChatComponent,
        UpdatesComponent,
        ServiceComponent,
        FollowersComponent,
        PostingNewUpdateComponent,
        ServiceReviewsComponent,
        ServiceRelatedComponent
      ],
      imports: [ AppRoutingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
