import { Component } from "@angular/core";
import { AdminService } from "../../../Core/Services/AdminService/admin.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { SearchService } from "../../../Core/Helpers/search.service";
import { ProfileImageComponent } from "../../../Shared/Elements/profile-image/profile-image.component";
import Swal from "sweetalert2";
import { AppService } from "../../../Core/Services/app.service";
import { StatusClassService } from "../../../Core/Helpers/status-class.service";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { AdminRequestsService } from "../../../Core/Requests/Admin/admin-requests.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-list-users",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ProfileImageComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: "./list-users.component.html",
  styleUrl: "./list-users.component.css",
})
export class ListUsersComponent {
  errors!: any;
  admins$: any[] = [];
  filter: boolean = false;
  adminsAfterFilter: any[] = [];
  searchTerm: any;
  admin$!: any;
  enableSwitch = new FormControl<Boolean>(false); // or false, depending on your initial state
  form!: FormGroup;

  constructor(
    private adminService: AdminService,
    private adminRequests: AdminRequestsService,
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private searchService: SearchService,

    private appService: AppService,
    private statusService: StatusClassService,
    public utils: UtilsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.adminService.result$.subscribe((data) => (this.admins$ = data));
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCurrentUser();

    this.adminService.GetAdmins();
    this.form = this.fb.group({
      switches: this.fb.array([]),
    });
    this.loadAdminSwitches();
  }
  private loadAdminSwitches(): void {
    const control = this.form.get("switches") as FormArray;
    const admins = this.admins$;
    control.clear(); // Clear any existing controls
    admins.forEach((admin) => {
      control.push(this.fb.control(this.utils.isSuperAdmin(admin)));
    });
  }

  enableSwitchChange(index: number, event: Event) {
    const target = event.target as HTMLInputElement;

    this.adminService.SwitchToSuperAdmin(index, target.checked);
  }

  /*  getAdmins() {
    this.spinner.show();
    this.adminService.GetAdmins();
       this.adminRequests.getAdmins().subscribe(
      (data) => {
        this.spinner.hide();
        this.admins$ = data;
      },
      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);

        this.errors = this.handleErrors.handleError(err);
      }
    );

  } */

  serachByName() {
    if (this.searchTerm.trim() !== "") {
      this.filter = true;

      this.admins$ = this.searchService.searchUser(
        this.searchTerm,
        this.admins$
      );
    } else {
      this.filter = false;
    }
  }

  navigateToPorfile(id: any) {
    this.router.navigate(["/profile/" + id + "/overview"], {
      queryParams: { viewProfile: true },
    });
  }

  getCurrentUser() {
    this.appService.getUser$.subscribe((data: any) => {
      this.admin$ = data;
    });
  }

  onDeleteAdmin(admin: any) {
    this.adminService.DeleteAdmin(admin.id);
  }

  getClassStatus(status: any) {
    return this.statusService.getClassStatusUser(status);
  }

  getClassRole(role: any) {
    return this.statusService.getClassAdmin(role);
  }
}
