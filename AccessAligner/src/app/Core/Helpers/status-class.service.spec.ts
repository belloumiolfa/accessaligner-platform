import { TestBed } from '@angular/core/testing';

import { StatusClassService } from './status-class.service';

describe('StatusClassService', () => {
  let service: StatusClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
