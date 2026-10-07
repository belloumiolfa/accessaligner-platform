import { TestBed } from '@angular/core/testing';

import { TypeTreatmentService } from './type-treatment.service';

describe('TypeTreatmentService', () => {
  let service: TypeTreatmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeTreatmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
