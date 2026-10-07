import { Component } from "@angular/core";
import { BlockHeaderComponent } from "../../../Shared/Elements/block-header/block-header.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-plan",
  standalone: true,
  imports: [BlockHeaderComponent, RouterModule],
  templateUrl: "./plan.component.html",
  styleUrl: "./plan.component.css",
})
export class PlanComponent {}
