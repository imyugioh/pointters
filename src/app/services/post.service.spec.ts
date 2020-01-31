import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule }    from '@angular/common/http';
import { FacebookModule }      from 'ngx-facebook';

import { PostService } from './post.service';
import { AuthService }         from './auth.service';

describe('PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        PostService,
        AuthService
      ],
      imports: [ 
        HttpClientModule,
        FacebookModule.forRoot()
       ]
    });
  });

  it('should be created', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));
});
