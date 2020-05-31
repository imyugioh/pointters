import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule }    from '@angular/common/http';

import { FacebookModule }      from 'ngx-facebook';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [ 
        HttpClientModule,
        FacebookModule.forRoot()
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
