import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishTreatmentComponent } from './finish-treatment.component';

describe('FinishTreatmentComponent', () => {
  let component: FinishTreatmentComponent;
  let fixture: ComponentFixture<FinishTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishTreatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
