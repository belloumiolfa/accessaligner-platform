import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDisplayItemPlanComponent } from './modal-display-item-plan.component';

describe('ModalDisplayItemPlanComponent', () => {
  let component: ModalDisplayItemPlanComponent;
  let fixture: ComponentFixture<ModalDisplayItemPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDisplayItemPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDisplayItemPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
