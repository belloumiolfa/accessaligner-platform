import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTreatPhotosInformationsComponent } from './patient-treat-photos-informations.component';

describe('PatientTreatPhotosInformationsComponent', () => {
  let component: PatientTreatPhotosInformationsComponent;
  let fixture: ComponentFixture<PatientTreatPhotosInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientTreatPhotosInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientTreatPhotosInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
