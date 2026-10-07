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
import { AuthService } from "../../Core/Services/AuthService/auth.service";
import { PreloaderComponent } from "../../Shared/Ui/preloader/preloader.component";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PreloaderComponent,
    TranslateModule,
  ],
  providers: [],
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.css",
})
export class SignUpComponent {
  showRepeatPassword: boolean = false;
  showPassword: boolean = false;
  errors: any = {};
  formSubmitted: boolean = false;
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

    private authService: AuthService,
    private handleErrors: HandleErrorsService
  ) {
    this.signUpForm = this.formBuilder.group({
      userName: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
      term: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit(e: Event) {
    this.errors = {};
    this.formSubmitted = true;
    if (this.signUpForm.valid) {
      this.authService.SignUp(this.signUpForm.value);

      this.errors = this.handleErrors.errors;
    }
  }
}
