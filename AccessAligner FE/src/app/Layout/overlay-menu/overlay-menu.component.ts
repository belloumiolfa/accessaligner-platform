import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-overlay-menu",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./overlay-menu.component.html",
  styleUrl: "./overlay-menu.component.css",
})
export class OverlayMenuComponent {
  @Input() action!: any;
}
