import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule }    from './../../app-routing.module';

import { HomeComponent }                 from './../home/home.component';
import { UpdatesComponent }              from './../updates/updates.component';
import { ServiceComponent }              from './../service/service.component';
import { FollowingComponent }            from './../following/following.component';
import { ChatComponent } from './../chat/chat.component';
import { FollowersComponent } from './followers.component';
import { PostingNewUpdateComponent }     from './../../components/posting-new-update/posting-new-update.component';

import { ServiceReviewsComponent }  from './../../components/service-reviews/service-reviews.component';
import { ServiceRelatedComponent }  from './../../components/service-related/service-related.component';

describe('FollowersComponent', () => {
  let component: FollowersComponent;
  let fixture: ComponentFixture<FollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        FollowersComponent,
        HomeComponent,
        ChatComponent,
        UpdatesComponent,
        ServiceComponent,
        FollowingComponent,
        PostingNewUpdateComponent,
        ServiceReviewsComponent,
        ServiceRelatedComponent
      ],
      imports: [ AppRoutingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
