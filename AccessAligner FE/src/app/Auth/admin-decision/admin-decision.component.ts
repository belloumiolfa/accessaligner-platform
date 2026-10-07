import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpLinkComponent } from '../../Shared/Elements/help-link/help-link.component';
import { CommonModule } from '@angular/common';
import { HandleErrorsService } from '../../Core/Helpers/handle-errors.service';
import { UtilsService } from '../Helpers/utils.service';
import { AcceptDecisionComponent } from '../accept-decision/accept-decision.component';
import { NewUserDetailsComponent } from '../../Components/New Treatment/new-user-details/new-user-details.component';
import { AuthService } from '../../Core/Services/AuthService/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcceptFormComponent } from '../accept-form/accept-form.component';

@Component({
  selector: 'app-admin-decision',
  standalone: true,
  imports: [
    CommonModule,
    HelpLinkComponent,
    AcceptDecisionComponent,
    AcceptFormComponent,
    NewUserDetailsComponent,
  ],
  templateUrl: './admin-decision.component.html',
  styleUrl: './admin-decision.component.css',
})
export class AdminDecisionComponent {
  user$!: any;
  errors!: any;
  admin!: any;
  user = this.route.snapshot.paramMap.get('user');
  constructor(
    private utils: UtilsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private handleErrors: HandleErrorsService,
    private spinner: NgxSpinnerService
  ) {
    this.admin = this.utils.getDecodedAccessToken(
      this.route.snapshot.paramMap.get('token')
    ).userId;
  }
  ngOnInit(): void {
    this.spinner.show();

    /*
    this.authSrvice.getUserById(this.user).subscribe(
      (data) => {
        this.spinner.hide();
        this.user$ = data;
      },
      (err) => {
        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);
      }
    );

*/

    this.authService
      .GetUserById(this.user, this.route.snapshot.paramMap.get('token'))
      .subscribe((data) => {
      //     console.log('data userrrr ', data);
      this.user$ = data;
      });
  }
}
