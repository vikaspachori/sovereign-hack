import { TestBed } from '@angular/core/testing';

import { HighChartService } from './high-chart.service';

describe('HighChartService', () => {
  let service: HighChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
