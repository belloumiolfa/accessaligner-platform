import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPatientComponent } from './add-new-patient.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AddNewPatientComponent', () => {
  let component: AddNewPatientComponent;
  let fixture: ComponentFixture<AddNewPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewPatientComponent],
      providers: [
        HttpClient , HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
