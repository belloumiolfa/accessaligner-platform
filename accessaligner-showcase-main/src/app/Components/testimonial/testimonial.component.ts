import { Component } from "@angular/core";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: "app-testimonial",
  standalone: true,
  imports: [CarouselModule],
  templateUrl: "./testimonial.component.html",
  styleUrl: "./testimonial.component.css",
})
export class TestimonialComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
  };
}
