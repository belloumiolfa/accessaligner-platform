import { TestBed } from '@angular/core/testing';

import { TreatmentRequestsService } from './treatment-requests.service';

describe('TreatmentRequestsService', () => {
  let service: TreatmentRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
