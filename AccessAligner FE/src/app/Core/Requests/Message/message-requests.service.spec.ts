import { TestBed } from '@angular/core/testing';

import { MessageRequestsService } from './message-requests.service';

describe('MessageRequestsService', () => {
  let service: MessageRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
