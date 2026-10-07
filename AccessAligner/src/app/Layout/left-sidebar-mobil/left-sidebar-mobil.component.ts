import { Component, Input, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MENU_ITEMS } from "../Shared/Config/menu-meta";
import {
  isTitleItem,
  hasSubmenu,
  hasGrandChildren,
  findAllParent,
} from "../Shared/Helpers/Utils";
import { RouterModule } from "@angular/router";
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDropdown,
} from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "../../Core/Services/app.service";
import { InfoProfileMenuComponent } from "../info-profile-menu/info-profile-menu.component";
import { MenuItem } from "../Shared/Models/menu.model";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-left-sidebar-mobil",
  standalone: true,
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgbCollapseModule,
    NgbDropdown,
    RouterModule,
    InfoProfileMenuComponent,
    TranslateModule,
  ],
  templateUrl: "./left-sidebar-mobil.component.html",
  styleUrl: "./left-sidebar-mobil.component.css",
})
export class LeftSidebarMobilComponent {
  @Input() action!: any;
  @Input() user!: any;
  menuItems: MenuItem[] = [];
  activeMenuItems: string[] = [];
  chunkSize: number = 7;
  isCollapsed: any = true;
  profilePhoto$: any;
  lengthPatients$: any;
  lengthTreatments$: any;
  lengthTreatmentsArchive$: any;

  constructor(private appService: AppService) {
    this.appService.getPhoto$.subscribe((data) => {
      this.profilePhoto$ = data;
    });

    this.appService.getNbrPatients$.subscribe((data) => {
      this.lengthPatients$ = data;
    });

    this.appService.getNbrTreatmentsArchive$.subscribe((data) => {
      this.lengthTreatmentsArchive$ = data;
    });

    this.appService.getNbrTreatments$.subscribe((data) => {
      this.lengthTreatments$ = data;
    });

    this.appService.getUser$.subscribe((data) => (this.user = data));
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["user"] && changes["user"].currentValue) {
      this.profilePhoto$ = changes["user"].currentValue.profile?.photo?.id;
    }
  }

  ngOnInit(): void {
    this.menuItems = MENU_ITEMS;
  }
  isTitleItem(item: MenuItem): any {
    return isTitleItem(item);
  }
  hasSubmenu(item: MenuItem): any {
    return hasSubmenu(item);
  }
  hasGrandChildren(item: MenuItem) {
    return hasGrandChildren(item);
  }
  /**
   *  Toggle the dropdown menu
   */
  toggleMenuItem(menuItem: MenuItem, collapse: any): void {
    menuItem.collapsed = !menuItem.collapsed;

    let openMenuItems: string[];
    if (!menuItem.collapsed) {
      openMenuItems = [
        menuItem["key"],
        ...findAllParent(this.menuItems, menuItem),
      ];

      // close other open menu
      this.menuItems.forEach((menu: MenuItem) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true;
        }
      });
    }
    collapse.toggle();
  }
}
