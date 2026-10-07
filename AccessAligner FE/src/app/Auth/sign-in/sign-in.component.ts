import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { AuthService } from "../../Core/Services/AuthService/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.css",
})
export class SignInComponent {
  // sign up request
  signInForm!: FormGroup;
  showPassword: boolean = false;
  errors: any = {};
  formSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private handleErrors: HandleErrorsService,
    private authSerivce: AuthService
  ) {
    this.signInForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      keepLoggedIn: new FormControl(false),
    });
  }
  ngOnInit(): void {}
  onSubmit(e: Event) {
    this.errors = {};
    this.formSubmitted = true;
    this.authSerivce.SignIn(this.signInForm.value);
    this.errors = this.handleErrors.errors;
  }
}
