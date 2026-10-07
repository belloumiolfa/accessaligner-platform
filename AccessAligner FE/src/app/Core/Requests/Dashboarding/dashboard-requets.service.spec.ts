import { TestBed } from '@angular/core/testing';

import { DashboardRequetsService } from './dashboard-requets.service';

describe('DashboardRequetsService', () => {
  let service: DashboardRequetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardRequetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
