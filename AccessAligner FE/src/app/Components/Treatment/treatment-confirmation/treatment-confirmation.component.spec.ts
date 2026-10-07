import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentConfirmationComponent } from './treatment-confirmation.component';

describe('TreatmentConfirmationComponent', () => {
  let component: TreatmentConfirmationComponent;
  let fixture: ComponentFixture<TreatmentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
