import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    // Mock the Router dependency
    router = jasmine.createSpyObj('Router', ['navigate']); // You can add more methods if needed

    // Create an instance of AuthGuard with the mocked Router
    authGuard = new AuthGuard(router);
  });

  it('should create an instance', () => {
    expect(authGuard).toBeTruthy();
  });
});
