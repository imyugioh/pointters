import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule }    from '@angular/common/http';

import { FacebookModule }      from 'ngx-facebook';
import { ServiceService } from './service.service';
import { AuthService }         from './auth.service';

describe('ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        ServiceService,
        AuthService
      ],
      imports: [ 
        HttpClientModule,
        FacebookModule.forRoot()
      ]
    });
  });

  it('should be created', inject([ServiceService], (service: ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
