import { TestBed } from '@angular/core/testing';

import { AdminRequestsService } from './admin-requests.service';

describe('AdminRequestsService', () => {
  let service: AdminRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
