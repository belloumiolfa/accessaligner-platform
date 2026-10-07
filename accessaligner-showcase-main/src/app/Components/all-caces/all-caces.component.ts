import { Component } from "@angular/core";
import { LightgalleryModule } from "lightgallery/angular";
import { BeforeSlideDetail } from "lightgallery/lg-events";

// light gallery plugins
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgvideo from "lightgallery/plugins/video";
import lghash from "lightgallery/plugins/hash";
import lgautoplay from "lightgallery/plugins/autoplay";
import lgfullscreen from "lightgallery/plugins/fullscreen";
import lgrotate from "lightgallery/plugins/rotate";
import lgshare from "lightgallery/plugins/share";
//dots
import lgpager from "lightgallery/plugins/pager";
import { CommonModule } from "@angular/common";
import { LightGallery } from "lightgallery/lightgallery";

@Component({
  selector: "app-all-caces",
  standalone: true,
  imports: [CommonModule, LightgalleryModule],
  templateUrl: "./all-caces.component.html",
  styleUrl: "./all-caces.component.css",
})
export class AllCacesComponent {
  images = [
    "../../../assets/images/cases/element1.png",
    "../../../assets/images/cases/element2.png",
    "../../../assets/images/cases/element3.png",
  ];
  private lightGallery!: LightGallery;
  private needRefresh = false;
  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh(this.items);
      this.lightGallery.openGallery();
      this.needRefresh = false;
    }
  }
  title = "angular-demo";
  items: any[] = [
    {
      id: "1",
      size: "1400-933",
      src: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
      thumb:
        "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
      subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@dann">Dan</a></h4>
            <p>Published on November 13, 2018</p>
        </div>`,
    },
    {
      id: "2",
      size: "1400-933",
      src: "https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
      thumb:
        "https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
      subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@kylepyt">Kyle Peyton</a></h4>
            <p>Published on September 14, 2016</p>
        </div>`,
    },
    {
      id: "3",
      size: "1400-932",
      src: "https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80",
      thumb:
        "https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80",
      subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@jxnsartstudio">Garrett Jackson</a></h4>
            <p>Published on May 8, 2020</p>
        </div>`,
    },
  ];
  settings = {
    counter: false,
    dynamic: true,
    dynamicEl: this.items,
    plugins: [lgZoom, lgThumbnail],
  };
  onInit = (detail: { instance: any }): void => {
    this.lightGallery = detail.instance;
  };
  addImage = () => {
    this.items = [
      ...this.items,
      {
        id: "4",
        size: "1400-933",
        src: "https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80",
        thumb:
          "https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80",
        subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@bruno_adam">Bruno Adam</a></h4>
            <p>Published on January 6, 2021</p>
        </div>`,
      },
    ];
    this.needRefresh = true;
  };
  openGallery = () => {
    this.lightGallery.openGallery();
  };
}
