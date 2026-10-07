import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-accept-decision",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./accept-decision.component.html",
  styleUrl: "./accept-decision.component.css",
})
export class AcceptDecisionComponent {
  @Input() user!: any;
}
