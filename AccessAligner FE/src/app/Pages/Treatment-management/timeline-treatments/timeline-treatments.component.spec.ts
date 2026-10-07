import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineTreatmentsComponent } from './timeline-treatments.component';

describe('TimelineTreatmentsComponent', () => {
  let component: TimelineTreatmentsComponent;
  let fixture: ComponentFixture<TimelineTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineTreatmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelineTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
