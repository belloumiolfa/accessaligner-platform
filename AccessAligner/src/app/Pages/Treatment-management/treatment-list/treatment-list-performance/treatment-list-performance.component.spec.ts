import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentListPerformanceComponent } from './treatment-list-performance.component';

describe('TreatmentListPerformanceComponent', () => {
  let component: TreatmentListPerformanceComponent;
  let fixture: ComponentFixture<TreatmentListPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentListPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentListPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
