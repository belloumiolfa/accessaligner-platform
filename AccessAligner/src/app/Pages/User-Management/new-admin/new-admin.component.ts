import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { generateStrongPassword } from "../../../Core/Helpers/utils";
import { AdminService } from "../../../Core/Services/AdminService/admin.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-new-admin",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: "./new-admin.component.html",
  styleUrl: "./new-admin.component.css",
})
export class NewAdminComponent {
  adminForm!: FormGroup;
  errors: any = {};
  showPassword: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private handleErrors: HandleErrorsService
  ) {
    this.adminForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }
  onSubmit($event: any) {
    this.errors = {};
    this.adminService.NewAdmin(this.adminForm.value);
    this.errors = this.handleErrors.errors;
  }
  onGenerateStrongPassword() {
    let password = generateStrongPassword();
    this.adminForm.patchValue({ password: password });
  }

  onReset() {
    this.errors = {};
  }
}
