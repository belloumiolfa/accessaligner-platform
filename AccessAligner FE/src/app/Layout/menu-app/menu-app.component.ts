import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-menu-app",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./menu-app.component.html",
  styleUrl: "./menu-app.component.css",
})
export class MenuAppComponent {
  @Input() action!: any;

  closeMenu() {
    this.action = false; // Assurez-vous que cela déclenche l'animation de fermeture dans votre CSS ou animations Angular
  }
}
