import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserDetailsComponent } from './new-user-details.component';

describe('NewUserDetailsComponent', () => {
  let component: NewUserDetailsComponent;
  let fixture: ComponentFixture<NewUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserDetailsComponent]
    })
    .compileComponents();
    
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NewUserDetailsComponent);
    const component = fixture.componentInstance;

    // Mock user object with profile and photo
    const mockUser = {
      profile: { photo: 'https://example.com/user-photo.jpg' }
    };

    component.user = mockUser; // Set the mock user

    fixture.detectChanges(); // Trigger change detection

    expect(component).toBeTruthy();
  });
});