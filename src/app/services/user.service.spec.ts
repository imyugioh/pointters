import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule }    from '@angular/common/http';

import { FacebookModule }      from 'ngx-facebook';
import { UserService } from './user.service';
import { AuthService }         from './auth.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        AuthService
      ],
      imports: [ 
        HttpClientModule,
        FacebookModule.forRoot()
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
