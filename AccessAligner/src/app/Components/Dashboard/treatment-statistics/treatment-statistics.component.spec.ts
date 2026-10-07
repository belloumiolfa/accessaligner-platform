import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentStatisticsComponent } from './treatment-statistics.component';

describe('TreatmentStatisticsComponent', () => {
  let component: TreatmentStatisticsComponent;
  let fixture: ComponentFixture<TreatmentStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
