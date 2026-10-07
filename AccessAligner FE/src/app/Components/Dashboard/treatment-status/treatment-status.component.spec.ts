import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentStatusComponent } from './treatment-status.component';

describe('TreatmentStatusComponent', () => {
  let component: TreatmentStatusComponent;
  let fixture: ComponentFixture<TreatmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
