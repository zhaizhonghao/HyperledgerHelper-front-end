import { TestBed } from '@angular/core/testing';

import { ApproveInfoService } from './approve-info.service';

describe('ApproveInfoService', () => {
  let service: ApproveInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
