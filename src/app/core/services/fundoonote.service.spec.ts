import { TestBed } from '@angular/core/testing';

import { FundoonoteService } from './fundoonote.service';

describe('FundoonoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FundoonoteService = TestBed.get(FundoonoteService);
    expect(service).toBeTruthy();
  });
});
