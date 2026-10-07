import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { UserService } from "../../../../Core/Services/UserService/user.service";
import { Subscription } from "rxjs";
import { AppService } from "../../../../Core/Services/app.service";

@Component({
  selector: "app-treatment-list-performance",
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: "./treatment-list-performance.component.html",
  styleUrl: "./treatment-list-performance.component.css",
})
export class TreatmentListPerformanceComponent {
  user$: any; // or whatever type your user data is
  private userSubscription!: Subscription;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    // Subscribe to the observable and store the subscription
    this.userSubscription = this.appService.getUser$.subscribe((data) => {
      this.user$ = data;
      console.log(this.user$);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the observable when the component is destroyed
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
