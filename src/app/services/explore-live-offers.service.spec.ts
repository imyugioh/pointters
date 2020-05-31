import { TestBed, inject } from '@angular/core/testing';

import { ExploreLiveOffersService } from './explore-live-offers.service';

describe('ExploreLiveOffersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExploreLiveOffersService]
    });
  });

  it('should be created', inject([ExploreLiveOffersService], (service: ExploreLiveOffersService) => {
    expect(service).toBeTruthy();
  }));
});
