import { TestBed } from '@angular/core/testing';

import { HandleAlertsService } from './handle-alerts.service';

describe('HandleAlertsService', () => {
  let service: HandleAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
