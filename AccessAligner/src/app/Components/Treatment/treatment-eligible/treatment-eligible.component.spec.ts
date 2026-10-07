import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentEligibleComponent } from './treatment-eligible.component';

describe('TreatmentEligibleComponent', () => {
  let component: TreatmentEligibleComponent;
  let fixture: ComponentFixture<TreatmentEligibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentEligibleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentEligibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
