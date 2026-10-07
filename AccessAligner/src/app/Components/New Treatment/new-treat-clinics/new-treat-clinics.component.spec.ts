import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTreatClinicsComponent } from './new-treat-clinics.component';

describe('NewTreatClinicsComponent', () => {
  let component: NewTreatClinicsComponent;
  let fixture: ComponentFixture<NewTreatClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTreatClinicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTreatClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
