import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { AppService } from "../../../Core/Services/app.service";
import { TeamInfoComponent } from "../../../Shared/Elements/team-info/team-info.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-new-plan",
  standalone: true,
  imports: [RouterModule, CommonModule, TeamInfoComponent, TranslateModule],
  templateUrl: "./new-plan.component.html",
  styleUrl: "./new-plan.component.css",
})
export class NewPlanComponent {
  @Input() treatment$!: any;
  user$!: any;

  constructor(private appService: AppService, public utils: UtilsService) {
    this.appService.getUser$.subscribe((data) => {
      this.user$ = data;
    });
  }
}
