import { CommonModule } from "@angular/common";
import { Component, Input, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-post-content",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./post-content.component.html",
  styleUrl: "./post-content.component.css",
})
export class PostContentComponent {
  @Input() post!: any;
  slice!: number;
  // Flag to toggle between expanded/collapsed state
  isExpanded: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes["post"]) {
      const currentValue = changes["post"].currentValue;
      this.slice = Math.round(currentValue.length / 2);
    }
  }

  // Method to toggle the state
  seeMore() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) this.slice = this.post.length;
    else this.slice = Math.round(this.post.length) / 2;
  }
}
