import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDecisionComponent } from './accept-decision.component';

describe('AcceptDecisionComponent', () => {
  let component: AcceptDecisionComponent;
  let fixture: ComponentFixture<AcceptDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptDecisionComponent]
    })
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AcceptDecisionComponent);
    const component = fixture.componentInstance;

   

   // Provide a mock user object
   component.user = {
    userStatus: {
      status: {
        id: 4
      },
      responsible: {
        profile: {
          firstName: 'John',
          lastName: 'Doe'
        }
      }
    }
  };

    fixture.detectChanges(); // Trigger change detection

    expect(component).toBeTruthy();
  });
});