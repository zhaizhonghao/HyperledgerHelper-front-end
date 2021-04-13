import { TestBed } from '@angular/core/testing';

import { ConfigtxService } from './configtx.service';

describe('ConfigtxService', () => {
  let service: ConfigtxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigtxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
