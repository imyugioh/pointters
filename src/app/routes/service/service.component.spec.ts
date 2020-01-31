import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { AppRoutingModule }    from './../../app-routing.module';
import { HomeComponent }                 from './../home/home.component';
import { ServiceComponent } from './service.component';
import { ChatComponent } from './../chat/chat.component';
import { UpdatesComponent }              from './../updates/updates.component';
import { FollowersComponent } from './../followers/followers.component';
import { FollowingComponent }            from './../following/following.component';
import { PostingNewUpdateComponent }     from './../../components/posting-new-update/posting-new-update.component';

import { ServiceReviewsComponent }  from './../../components/service-reviews/service-reviews.component';
import { ServiceRelatedComponent }  from './../../components/service-related/service-related.component';

describe('ServiceComponent', () => {
  let component: ServiceComponent;
  let fixture: ComponentFixture<ServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ServiceComponent,
        HomeComponent,
        ChatComponent,
        UpdatesComponent,
        FollowersComponent,
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
    fixture = TestBed.createComponent(ServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
