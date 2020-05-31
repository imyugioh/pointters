import { TestBed, inject } from '@angular/core/testing';

import { As3Service } from './as3.service';

describe('As3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [As3Service]
    });
  });

  it('should be created', inject([As3Service], (service: As3Service) => {
    expect(service).toBeTruthy();
  }));
});
