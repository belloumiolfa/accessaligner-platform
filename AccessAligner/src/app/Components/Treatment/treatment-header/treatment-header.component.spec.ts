import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentHeaderComponent } from './treatment-header.component';

describe('TreatmentHeaderComponent', () => {
  let component: TreatmentHeaderComponent;
  let fixture: ComponentFixture<TreatmentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
