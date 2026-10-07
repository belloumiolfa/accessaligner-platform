import { TestBed } from '@angular/core/testing';

import { EstimateRequestsService } from './estimate-requests.service';

describe('EstimateRequestsService', () => {
  let service: EstimateRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimateRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
