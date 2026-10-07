import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfosComponent } from './patient-infos.component';

describe('PatientInfosComponent', () => {
  let component: PatientInfosComponent;
  let fixture: ComponentFixture<PatientInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
