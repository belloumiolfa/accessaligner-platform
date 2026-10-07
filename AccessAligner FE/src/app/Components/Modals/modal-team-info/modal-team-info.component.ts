import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from "ng-multiselect-dropdown";

import { CommonModule } from "@angular/common";
import { TeamInfoComponent } from "../../../Shared/Elements/team-info/team-info.component";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { AdminRequestsService } from "../../../Core/Requests/Admin/admin-requests.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-modal-team-info",
  standalone: true,
  imports: [
    NgMultiSelectDropDownModule,
    FormsModule,
    CommonModule,
    TeamInfoComponent,
    TranslateModule,
  ],
  templateUrl: "./modal-team-info.component.html",
  styleUrl: "./modal-team-info.component.css",
})
export class ModalTeamInfoComponent implements OnInit {
  @Input() treatment: any = [];

  dropdownList: any[] = [];
  selectedItems: any = [];
  dropdownSettings!: IDropdownSettings;
  admins: any[] = [];
  errors: any;

  constructor(
    private adminRequests: AdminRequestsService,
    private treatmentService: TreatmentService,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,

    private handleErrors: HandleErrorsService
  ) {}
  ngOnInit() {
    this.adminRequests.getAdmins().subscribe(
      (data) => {
        this.admins = data;

        this.admins.forEach((element: any) => {
          let admin = {
            item_id: element.id,
            item_name:
              element.profile.firstName && element.profile.lastName
                ? element.profile.firstName + " " + element.profile.lastName
                : element.userName,
          };
          this.dropdownList.push(admin);
        });
      },
      (err) => {
        console.log(err);

        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);
      }
    );

    this.treatment?.team?.forEach((element: any) => {
      let admin = {
        item_id: element.id,
        item_name:
          element.profile.firstName && element.profile.lastName
            ? element.profile.firstName + " " + element.profile.lastName
            : element.userName,
      };

      this.selectedItems?.push(admin);
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onSaveTeam() {
    let admins: any[] = [];
    this.selectedItems?.forEach((element: any) => {
      admins.push(element.item_id);
    });

    this.treatmentService.AddTeam(this.treatment?.id, admins);
  }
  onResetTeam() {
    this.selectedItems = [];
    this.close();
  }

  close() {
    this.activeModal.close();
  }
}
