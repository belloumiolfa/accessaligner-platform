import { Component, Input } from "@angular/core";
import { BackHomeComponent } from "../../Shared/Elements/back-home/back-home.component";

@Component({
  selector: "app-confirm-decision",
  standalone: true,
  imports: [BackHomeComponent],
  templateUrl: "./confirm-decision.component.html",
  styleUrl: "./confirm-decision.component.css",
})
export class ConfirmDecisionComponent {
  @Input() title!: string;
  @Input() subTitle!: string;
}
