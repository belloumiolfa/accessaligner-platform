import { Component } from "@angular/core";
import { HelpLinkComponent } from "../../Shared/Elements/help-link/help-link.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../Core/Services/AuthService/auth.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-forget-password",
  standalone: true,
  imports: [
    HelpLinkComponent,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: "./forget-password.component.html",
  styleUrl: "./forget-password.component.css",
})
export class ForgetPasswordComponent {
  form!: FormGroup;
  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }
  onSubmit(e: Event) {
    if (this.form.valid) {
      this.authService.ForgetPassword(this.form.value.email);
    }
  }
}
