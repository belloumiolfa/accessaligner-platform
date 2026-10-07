import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTreatInformationsComponent } from './patient-treat-informations.component';

describe('PatientTreatInformationsComponent', () => {
  let component: PatientTreatInformationsComponent;
  let fixture: ComponentFixture<PatientTreatInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientTreatInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientTreatInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
