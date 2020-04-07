import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { FacebookModule }      from 'ngx-facebook';

import { PostingNewUpdateComponent } from './posting-new-update.component';
import { AuthService }         from './../../services/auth.service';

import { PostService } from './../../services/post.service';

describe('PostingNewUpdateComponent', () => {
  let component: PostingNewUpdateComponent;
  let fixture: ComponentFixture<PostingNewUpdateComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PostingNewUpdateComponent ],
        imports: [ HttpClientModule,
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
    fixture = TestBed.createComponent(PostingNewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
