import { TestBed } from '@angular/core/testing';

import { VwuserService } from './vwuser.service';

describe('VwuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VwuserService = TestBed.get(VwuserService);
    expect(service).toBeTruthy();
  });
});
