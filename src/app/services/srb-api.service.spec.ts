import { TestBed } from '@angular/core/testing';

import { SrbApiService } from './srb-api.service';

describe('SrbApiService', () => {
  let service: SrbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
