import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-notif-menu",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./notif-menu.component.html",
  styleUrl: "./notif-menu.component.css",
})
export class NotifMenuComponent {
  @Input() action!: any;
}
