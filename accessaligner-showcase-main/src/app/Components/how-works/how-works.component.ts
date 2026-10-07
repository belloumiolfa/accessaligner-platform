import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-how-works",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./how-works.component.html",
  styleUrl: "./how-works.component.css",
})
export class HowWorksComponent {}
