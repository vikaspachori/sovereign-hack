import { TestBed } from '@angular/core/testing';

import { CovalentapService } from './covalentap.service';

describe('CovalentapService', () => {
  let service: CovalentapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovalentapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
