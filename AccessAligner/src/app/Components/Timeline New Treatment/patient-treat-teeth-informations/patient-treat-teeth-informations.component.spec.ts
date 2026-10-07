import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTreatTeethInformationsComponent } from './patient-treat-teeth-informations.component';

describe('PatientTreatTeethInformationsComponent', () => {
  let component: PatientTreatTeethInformationsComponent;
  let fixture: ComponentFixture<PatientTreatTeethInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientTreatTeethInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientTreatTeethInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
