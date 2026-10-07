import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPlansTreatComponent } from './get-plans-treat.component';

describe('GetPlansTreatComponent', () => {
  let component: GetPlansTreatComponent;
  let fixture: ComponentFixture<GetPlansTreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetPlansTreatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetPlansTreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
