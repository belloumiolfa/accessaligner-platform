import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDisplayInformationsComponent } from './patient-display-informations.component';

describe('PatientDisplayInformationsComponent', () => {
  let component: PatientDisplayInformationsComponent;
  let fixture: ComponentFixture<PatientDisplayInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDisplayInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientDisplayInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
