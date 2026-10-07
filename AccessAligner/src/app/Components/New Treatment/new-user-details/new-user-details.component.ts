import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-new-user-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./new-user-details.component.html",
  styleUrl: "./new-user-details.component.css",
})
export class NewUserDetailsComponent {
  @Input() user!: any;
}
