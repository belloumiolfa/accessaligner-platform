import { Component } from "@angular/core";
import { ProfileImageComponent } from "../../../Shared/Elements/profile-image/profile-image.component";
import { CommonModule } from "@angular/common";
import { DashboardService } from "../../../Core/Services/DashboardService/dashboard.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-top-dentist",
  standalone: true,
  imports: [CommonModule, ProfileImageComponent],
  templateUrl: "./top-dentist.component.html",
  styleUrl: "./top-dentist.component.css",
})
export class TopDentistComponent {
  topDentist$: any;
  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {
    dashboardService.getTopDentist$.subscribe((data) => {
      this.topDentist$ = data;
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.dashboardService.getTopDentist();
  }
  navigateToPorfile(id: number) {
    this.router.navigate(["/profile/" + id + "/overview"], {
      queryParams: { viewProfile: true },
    });
  }
}
