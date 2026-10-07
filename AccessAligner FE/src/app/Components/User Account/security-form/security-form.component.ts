import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UserService } from "../../../Core/Services/UserService/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-security-form",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: "./security-form.component.html",
  styleUrl: "./security-form.component.css",
})
export class SecurityFormComponent {
  securityForm!: FormGroup<any>;
  errors: any = {};
  showCurrentPassword: any;
  showNewPassword: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private handleErrors: HandleErrorsService,
    private spinner: NgxSpinnerService
  ) {
    this.securityForm = this.formBuilder.group({
      userName: new FormControl("", [Validators.required]),
      currentPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
    });
  }

  onSubmit($event: any) {
    this.errors = this.handleErrors.handleError({});
    this.spinner.show();

    if (this.securityForm.valid) {
      this.userService.UpdateSettings(this.securityForm.value);
    }
  }
}
