import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MargintradingComponent } from './margintrading.component';

describe('MargintradingComponent', () => {
  let component: MargintradingComponent;
  let fixture: ComponentFixture<MargintradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MargintradingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MargintradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
