import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTreatClinicsInformationsComponent } from './patient-treat-clinics-informations.component';

describe('PatientTreatClinicsInformationsComponent', () => {
  let component: PatientTreatClinicsInformationsComponent;
  let fixture: ComponentFixture<PatientTreatClinicsInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientTreatClinicsInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientTreatClinicsInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
