import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from "../../../../environments/environment.development";
import { User } from '../../Models/user.models'; // Adjust the path as needed

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fail signup when passwords do not match', () => {
    const signupData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      confirmPassword: 'diffpassword321'
    };

    service.signup(signupData).subscribe(
      () => fail('expected an error, not user'),
      (error) => {
        expect(error.status).toBe(400);

      //  console.log("error message",error.error.message)
        expect(error.error.message).toBe('Passwords do not match');
      }
    );

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/public/signup`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Passwords do not match' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should fail signup when passwords not strong', () => {
    const signupData = {
      email: 'test@example.com',
      username: 'testuser',
      password: '12345',
      confirmPassword: '12345'
    };

    console.log("test")
    service.signup(signupData).subscribe(
      () => fail('expected an error, not user'),
      (error) => {
        expect(error.status).toBe(400);

        console.log("error message",error.error)
        expect(error.error.message).toBe('Password must contain at least one lowercase character, one uppercase character, one number, and one special character');
      }
    );

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/public/signup`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Password must contain at least one lowercase character, one uppercase character, one number, and one special character ' }, { status: 400, statusText: 'Bad Request' });

  });


});