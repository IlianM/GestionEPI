import { TestBed } from '@angular/core/testing';

import { EpiCheckService } from './epi-check.service';

describe('EpiCheckService', () => {
  let service: EpiCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpiCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
