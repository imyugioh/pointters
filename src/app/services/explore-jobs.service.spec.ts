import { TestBed, inject } from '@angular/core/testing';

import { ExploreJobsService } from './explore-jobs.service';

describe('ExploreJobsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExploreJobsService]
    });
  });

  it('should be created', inject([ExploreJobsService], (service: ExploreJobsService) => {
    expect(service).toBeTruthy();
  }));
});
