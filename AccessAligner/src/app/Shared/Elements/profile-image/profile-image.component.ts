import { Component, Input, SimpleChanges } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { NgxSpinnerService } from "ngx-spinner";
import { UserRequestsService } from "../../../Core/Requests/User/user-requests.service";

@Component({
  selector: "app-profile-image",
  standalone: true,
  imports: [],
  templateUrl: "./profile-image.component.html",
  styleUrl: "./profile-image.component.css",
})
export class ProfileImageComponent {
  @Input() photoId!: any;
  @Input() class!: any;
  @Input() expression!: any;
  errors: any;

  constructor(
    private sanitizer: DomSanitizer,
    private userRequests: UserRequestsService,
    private handleErrors: HandleErrorsService,
    private spinner: NgxSpinnerService
  ) {}

  photo!: any;
  getProfilePhoto(id: any) {
    if (id)
      this.userRequests.getPhoto(id, "Profile").subscribe(
        (data: any) => {
          const reader = new FileReader();
          let imageUrl!: SafeUrl;

          reader.onload = (e: any) => {
            imageUrl = this.sanitizer.bypassSecurityTrustUrl(
              URL.createObjectURL(data)
            );
            this.photo = imageUrl;
          };
          reader.readAsDataURL(data);
        },
        (err: any) => {
          this.errors = this.handleErrors.handleError(err);
          this.spinner.hide();
        }
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["photoId"] && changes["photoId"].currentValue) {
      if (changes["photoId"].currentValue !== undefined)
        this.getProfilePhoto(changes["photoId"].currentValue);
    }
  }
  ngAfterContentInit(): void {
    if (this.photoId) this.getProfilePhoto(this.photoId);
  }
}
