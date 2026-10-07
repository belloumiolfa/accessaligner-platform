import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFormComponent } from './confirm-form.component';
import { AuthService } from '../../Core/Services/AuthService/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ConfirmFormComponent', () => {
  let component: ConfirmFormComponent;
  let fixture: ComponentFixture<ConfirmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmFormComponent],
      providers: [
        AuthService, HttpClient, HttpHandler]
    })
    .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ConfirmFormComponent);
    const component = fixture.componentInstance;

    // Mock user object with userName and email properties
    const mockUser = { userName: 'John Doe', email: 'john.doe@example.com' };

    component.user = mockUser; // Set the mock user

    fixture.detectChanges(); // Trigger change detection

    expect(component).toBeTruthy();
  });
});