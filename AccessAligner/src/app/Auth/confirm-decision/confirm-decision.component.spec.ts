import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDecisionComponent } from './confirm-decision.component';

describe('ConfirmDecisionComponent', () => {
  let component: ConfirmDecisionComponent;
  let fixture: ComponentFixture<ConfirmDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDecisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
