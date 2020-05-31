import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FacebookModule }      from 'ngx-facebook';

import { UpdatesComponent } from './updates.component';
import { PostingNewUpdateComponent }     from './../../components/posting-new-update/posting-new-update.component';
import { AuthService }         from './../../services/auth.service';
import { PostService } from './../../services/post.service';

describe('UpdatesComponent', () => {
  let component: UpdatesComponent;
  let fixture: ComponentFixture<UpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UpdatesComponent,
        PostingNewUpdateComponent
      ],
      imports: [ 
        HttpClientModule,
        ReactiveFormsModule,
        FacebookModule.forRoot()
      ],
      providers: [ 
        AuthService,
        PostService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
