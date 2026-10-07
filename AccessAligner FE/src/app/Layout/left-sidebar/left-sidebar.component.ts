import { CommonModule } from "@angular/common";
import { Component, Input, SimpleChanges } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDropdown,
} from "@ng-bootstrap/ng-bootstrap";
import { MENU_ITEMS } from "../Shared/Config/menu-meta";
import { MenuItem } from "../Shared/Models/menu.model";
import {
  hasGrandChildren,
  hasSubmenu,
  isTitleItem,
  findAllParent,
} from "../Shared/Helpers/Utils";
import { AppService } from "../../Core/Services/app.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { InfoProfileMenuComponent } from "../info-profile-menu/info-profile-menu.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-left-sidebar",
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
  templateUrl: "./left-sidebar.component.html",
  styleUrl: "./left-sidebar.component.css",
})
export class LeftSidebarComponent {
  @Input() user!: any;

  menuItems: MenuItem[] = [];
  activeMenuItems: string[] = [];
  lengthPatients$: any;
  lengthTreatments$: any;
  lengthTreatmentsArchive$: any;
  chunkSize: number = 7;
  isCollapsed: any = true;
  profilePhoto$: any;
  selectedMenuItemKey$ = new BehaviorSubject<string | null>(null);
  user$!: any;

  constructor(private appService: AppService, private router: Router) {
    appService.getPhoto$.subscribe((data) => {
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

    this.appService.getUser$.subscribe((data) => (this.user$ = data));
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

  toggleMenuItem(menuItem: MenuItem, collapse: any): void {
    menuItem.collapsed = !menuItem.collapsed;

    let openMenuItems: string[];
    if (!menuItem.collapsed) {
      openMenuItems = [
        menuItem["key"],
        ...findAllParent(this.menuItems, menuItem),
      ];

      this.menuItems.forEach((menu: MenuItem) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true;
        }
      });
    }

    this.selectedMenuItemKey$?.next(menuItem.key || null);
    collapse.toggle();
  }

  isActive(menu: any): boolean {
    if (menu.urlsChildrens != null) {
      for (const urlchild in menu.urlsChildrens) {
        if (this.router.isActive(menu.urlsChildrens[urlchild], true)) {
          return true;
        }
      }
    } else {
      return this.router.isActive(menu.url, true);
    }

    return this.router.isActive(menu.url, true);
  }

  isActiveMC(menu: any): boolean {
    return this.router.isActive(menu.url, true);
  }

  isSelected(menu: any): boolean {
    return this.selectedMenuItemKey$ === menu.key;
  }

  setSelectedMenuItem(menu: any) {
    this.appService.setPatient$({});
    this.appService.setTreatment({});

    this.selectedMenuItemKey$ = menu.key;
  }
  roleManger(menu: any): any {
    for (let index = 0; index < this.user$?.roleList?.length; index++) {
      const element = this.user$?.roleList[index];
      if (menu.access.includes(element.name)) {
        return true;
      }
    }
    return false;
  }
}
