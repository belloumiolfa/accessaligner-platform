import { TestBed } from '@angular/core/testing';

import { PlanRequestsService } from './plan-requests.service';

describe('PlanRequestsService', () => {
  let service: PlanRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
