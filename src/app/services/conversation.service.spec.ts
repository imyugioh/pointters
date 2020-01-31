import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule }    from '@angular/common/http';

import { FacebookModule }      from 'ngx-facebook';
import { ConversationService } from './conversation.service';
import { AuthService }         from './auth.service';

describe('ConversationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        ConversationService,
        AuthService
      ],
      imports: [ 
        HttpClientModule,
        FacebookModule.forRoot()
      ],
    });
  });

  it('should be created', inject([ConversationService], (service: ConversationService) => {
    expect(service).toBeTruthy();
  }));
});
