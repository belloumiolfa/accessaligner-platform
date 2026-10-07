import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridUsersComponent } from '../grid-users/grid-users.component';
import { HandleErrorsService } from '../../../Core/Helpers/handle-errors.service';
import { UserRequestsService } from '../../../Core/Requests/User/user-requests.service';

@Component({
  selector: 'app-list-doctors',
  standalone: true,
  imports: [GridUsersComponent],
  templateUrl: './list-doctors.component.html',
  styleUrl: './list-doctors.component.css',
})
export class ListDoctorsComponent {
  doctors$: any[] = [];
  photoMap: any[] = [];
  errors: any;

  constructor(
    private userRequests: UserRequestsService,
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
  ) {
    this.spinner.show();
    this.userRequests.getDoctors().subscribe(
      (data) => {
        console.log('doctors data', data);
        this.doctors$ = data.filter(
          (doctor: { userStatus: { status: { name: string } } }) =>
            doctor.userStatus.status.name != 'BLOCKED',
        );

        this.spinner.hide();
      },
      (err) => {
        this.errors = this.handleErrors.handleError(err);
        this.spinner.hide();
      },
    );
  }
}
