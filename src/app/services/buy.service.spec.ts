import { TestBed, inject } from '@angular/core/testing';

import { BuyService } from './buy.service';

describe('BuyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuyService]
    });
  });

  it('should be created', inject([BuyService], (service: BuyService) => {
    expect(service).toBeTruthy();
  }));
});
