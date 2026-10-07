import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AppService } from "../../../Core/Services/app.service";
import { User } from "../../../Core/Models/user.models";
import { UserService } from "../../../Core/Services/UserService/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { TranslateModule } from "@ngx-translate/core";
declare var $: any;
@Component({
  selector: "app-account-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: "./account-form.component.html",
  styleUrl: "./account-form.component.css",
})
export class AccountFormComponent implements OnInit {
  profileForm!: FormGroup<any>;
  user$!: User;
  errors: any;
  birthDate!: any;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private userService: UserService,
    private handleErrors: HandleErrorsService,
    public utilsService: UtilsService
  ) {
    this.appService.getUser$.subscribe((data) => {
      this.user$ = data;

      this.birthDate = new Date(this.user$.profile?.dateOfBirth);

      this.profileForm = this.formBuilder.group({
        firstName: new FormControl(this.user$.profile?.firstName, [
          Validators.required,
        ]),
        lastName: new FormControl(this.user$.profile?.lastName, [
          Validators.required,
        ]),
        dateOfBirth: new FormControl(this.user$.profile?.dateOfBirth, []),
        description: new FormControl(this.user$.profile?.description, []),
        profession: new FormControl(this.user$.profile?.profession, []),
        phone: new FormControl(this.user$.profile?.phone, []),
        mobile: new FormControl(this.user$.profile?.mobile, []),
        address: new FormControl(this.user$.profile?.address, []),
        tax: new FormControl(this.user$.profile?.tax, []),
      });
    });
  }
  ngOnInit(): void {
    $("#datetimepicker")
      .bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        maxDate: new Date(),
      })
      .on("change", (e: any, date: { format: (arg0: string) => any }) => {
        const formattedDate = date.format("YYYY-MM-DD");
        this.profileForm.get("dateOfBirth")?.setValue(formattedDate);
      });
  }

  onSubmit($event: any) {
    this.errors = this.handleErrors.handleError({});
    if (this.profileForm.valid) {
      this.userService.UpdateProfile(this.profileForm.value, this.user$);
    }
  }
}
