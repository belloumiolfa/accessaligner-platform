import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Core/Services/AuthService/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { data } from 'jquery';
import { first } from "rxjs";
import { HandleErrorsService } from '../../Core/Helpers/handle-errors.service';


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authservice : AuthService ;
  let errorsservice : HandleErrorsService ; 
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signup']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
     
      providers: [AuthService,
        { provide: AuthService, useValue: authServiceSpy },


      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService) ;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('email field validity', () => {
    let email = component.signUpForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue("test");
    expect(email.hasError('email')).toBeTruthy();
    expect(authservice)

    email.setValue("test@test.com");
    expect(email.valid).toBeTruthy();
});

it('sign up form  validity', () => {
  let email = component.signUpForm.controls['email'];
  let userName = component.signUpForm.controls['userName'] ;
  let phone=  component.signUpForm.controls['phone'] ;
  let password = component.signUpForm.controls['password'];
  let confirmPassword = component.signUpForm.controls['confirmPassword'] ;
  let term=component.signUpForm.controls['term'] ; 


  email.setValue("");
  userName.setValue("");
  phone.setValue("");
  password.setValue("");
  confirmPassword.setValue("");
  term.setValue("") ; 
  expect(component.signUpForm.valid).toBeFalsy() ;



  email.setValue("test@gmail.com");
  userName.setValue("ferjania");
  phone.setValue("12345678");
  password.setValue("Password123!");
  confirmPassword.setValue("Password123!");
  term.setValue("true") ; 
  expect(component.signUpForm.valid).toBeTruthy() ;





});



/*

it('strong password field ', () => {
  let password = component.signUpForm.controls['password'];

  password.setValue("passwo");
  
  // Trigger form submission
  component.onSubmit(new Event('submit'));

  // Expect appropriate error message in component errors object
  expect(component.errors.password).toBe("Password must be at least 8 characters long");


});





it('should set error message when passwords do not match', () => {

  let email = component.signUpForm.controls['email'];
  let userName = component.signUpForm.controls['userName'] ;
  let phone=  component.signUpForm.controls['phone'] ;
  let password = component.signUpForm.controls['password'];
  let confirmPassword = component.signUpForm.controls['confirmPassword'] ;
  let term=component.signUpForm.controls['term'] ; 

 
  email.setValue("test@gmail.com");
  userName.setValue("ferjania");
  phone.setValue("12345678");
  password.setValue("Password123!");
  confirmPassword.setValue("Passwrd123568!");
  term.setValue("true") ; 

  component.onSubmit(new Event('submit'));
  expect(authService.signup(component.signUpForm.value)).toHaveBeenCalledTimes(1) ;
  
  //console.log("errors ",component.errors)
  fixture.detectChanges();



  // Expect error message to be set
 // expect(component.errors.confirmPassword).toEqual('Passwords confirmation does not match');


});
*/

/*

it('should display "password not match" error message when passwords do not match', (() => {
  const formData = {
    userName:'ferjania',
    email: 'test@test.com',
    phone:'123456',
    password:'Password123!',
    confirmPassword: 'Differentpassword123!', // Mismatched password
  };

  const mockErrorResponse = { message: 'Passwords do not match' };

  authservice.signup(formData).pipe(first()).
  
  subscribe( data => {
    expect(data.message).toEqual("Passwords do not match");
  })
  

  const errorMessage = fixture.nativeElement.querySelector('.password-mismatch-error');
  expect(errorMessage.textContent).toContain('Passwords do not match');
}));

*/








});