import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-search",
  standalone: true,
  imports: [TranslateModule],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.css",
})
export class SearchComponent {}
