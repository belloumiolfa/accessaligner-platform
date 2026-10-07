import { Component, Input } from "@angular/core";

@Component({
  selector: "app-total-count-card",
  standalone: true,
  imports: [],
  templateUrl: "./total-count-card.component.html",
  styleUrl: "./total-count-card.component.css",
})
export class TotalCountCardComponent {
  @Input() title!: string;
  @Input() total!: Number;
  @Input() icon!: string;
}
