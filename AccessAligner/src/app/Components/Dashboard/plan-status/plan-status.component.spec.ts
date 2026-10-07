import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanStatusComponent } from './plan-status.component';

describe('PlanStatusComponent', () => {
  let component: PlanStatusComponent;
  let fixture: ComponentFixture<PlanStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
