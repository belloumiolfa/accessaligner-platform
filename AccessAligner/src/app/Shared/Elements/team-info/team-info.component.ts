import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ModalService } from "../../../Core/Helpers/modal.service";
import { ProfileImageComponent } from "../profile-image/profile-image.component";
import { AppService } from "../../../Core/Services/app.service";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-team-info",
  standalone: true,
  imports: [CommonModule, RouterModule, ProfileImageComponent, TranslateModule],
  templateUrl: "./team-info.component.html",
  styleUrl: "./team-info.component.css",
})
export class TeamInfoComponent {
  @Input() treatment!: any;
  @Input() addAction!: boolean;
  errors: any;
  user$: any;

  constructor(
    private modalService: ModalService,
    private appService: AppService,
    public utils: UtilsService,
    private router: Router
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
  }

  show = false;

  /*   onReset() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonColor: "#b9b9b9",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "sweet-alert",
      },
    }).then(
      (result: any) => {
        this.treatmentRequests.resetTeam(this.treatment?.id).subscribe(
          (data) => {
            this.appService.setTreatment({ ...this.treatment, team: [] });
            this.show = false;
            this.spinner.hide();

            this.handleAlerts.handleSweetAlert(data, "success", false);
          },
          (err) => {
            this.errors = this.handleErrors.handleError(err);
            this.spinner.hide();

            this.handleAlerts.handleSweetAlert(
              "Check your data input carefully.",
              "error",
              false
            );
          }
        );
      },
      (err: any) => {}
    );
  }

 */ navigateToPorfile(id: any) {
    this.router.navigate(["/profile/" + id + "/overview"], {
      queryParams: { viewProfile: true },
    });
  }

  onRemove() {
    this.show = false;
    this.modalService.openRemoveTeamModal(this.treatment);
  }

  onAdd(treatment: any) {
    this.show = false;

    this.modalService.openTeamModal(treatment);
  }
}
