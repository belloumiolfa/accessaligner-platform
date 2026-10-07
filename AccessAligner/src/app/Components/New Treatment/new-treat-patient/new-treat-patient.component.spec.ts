import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTreatPatientComponent } from './new-treat-patient.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('NewTreatPatientComponent', () => {
  let component: NewTreatPatientComponent;
  let fixture: ComponentFixture<NewTreatPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTreatPatientComponent],
      providers: [      HttpClient , HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTreatPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
