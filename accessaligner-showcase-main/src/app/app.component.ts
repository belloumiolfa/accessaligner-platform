import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "AccessAligner";
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen for navigation events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
}
