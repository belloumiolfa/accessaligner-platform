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
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { UtilsService } from "../Helpers/utils.service";
import { AuthRequestsService } from "../../Core/Requests/Auth/auth-requests.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-update-password",
  standalone: true,
  imports: [
    HelpLinkComponent,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: "./update-password.component.html",
  styleUrl: "./update-password.component.css",
})
export class UpdatePasswordComponent {
  updateForm!: FormGroup;
  showConfirmPassword: any;
  showPassword: any;
  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private authService: AuthRequestsService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    this.updateForm = this.formBuilder.group({
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(e: Event) {
    this.errors = this.handleErrors.handleError({});
    this.spinner.show();
    if (this.updateForm.valid) {
      this.authService
        .updatePassword(
          this.utils.getDecodedAccessToken(
            this.route.snapshot.paramMap.get("token")
          ).userId,
          this.updateForm.value.password,
          this.updateForm.value.confirmPassword
        )
        .subscribe(
          (data) => {
            this.spinner.hide();
            this.handleAlerts.handleSweetAlert(data.message, "success", false);
          },
          (err) => {
            this.spinner.hide();
            this.errors = this.handleErrors.handleError(err);
            this.handleAlerts.handleSweetAlert(
              "Check your data input carefully.",
              "error",
              false
            );
          }
        );
    }
  }
}
