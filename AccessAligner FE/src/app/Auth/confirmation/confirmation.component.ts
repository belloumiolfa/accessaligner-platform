import { Component } from '@angular/core';
import { BackHomeComponent } from '../../Shared/Elements/back-home/back-home.component';
import { HelpLinkComponent } from '../../Shared/Elements/help-link/help-link.component';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../Helpers/utils.service';
import { HandleErrorsService } from '../../Core/Helpers/handle-errors.service';
import { ConfirmFormComponent } from '../confirm-form/confirm-form.component';
import { ConfirmDecisionComponent } from '../confirm-decision/confirm-decision.component';
import { AuthService } from '../../Core/Services/AuthService/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    BackHomeComponent,
    HelpLinkComponent,
    CompanyDetailsComponent,
    CommonModule,
    ReactiveFormsModule,
    ConfirmFormComponent,
    ConfirmDecisionComponent,
    TranslateModule,
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
})
export class ConfirmationComponent {
  name = environment.companyName;
  confirmationInfos$!: any;
  confirmForm!: FormGroup;
  errors: any;

  constructor(
    private route: ActivatedRoute,
    private utils: UtilsService,
    private authService: AuthService,
    private handleErrors: HandleErrorsService,
    private spinner: NgxSpinnerService,
  ) {}

  token!: string;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const token = params.get('token');
      this.token = token!;
    });
    this.authService.loadConfirmationInfo(this.token).subscribe(
      (data: any) => {
        this.confirmationInfos$ = data;
      },
      (err: any) => {
        this.errors = this.handleErrors.handleError(err);
      },
    );
  }

  onChangeUser(event$: any) {
    this.confirmationInfos$ = event$;
  }
}
