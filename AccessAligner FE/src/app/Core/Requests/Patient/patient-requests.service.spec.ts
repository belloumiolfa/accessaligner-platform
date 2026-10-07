import { TestBed } from '@angular/core/testing';

import { PatientRequestsService } from './patient-requests.service';

describe('PatientRequestsService', () => {
  let service: PatientRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
