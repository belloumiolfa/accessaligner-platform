import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { loggedInUser } from "../../Helpers/utils";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class PlanRequestsService {
  apiBaseUrl = environment.apiBaseUrl;

  lang!: any;
  constructor(private http: HttpClient, private translate: TranslateService) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  getPlans(): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/get-plans`, {
        headers: new HttpHeaders()
          .set("Authorization", `Bearer ${loggedInUser()}`)
          .set("Accept-Language", this.lang), // Set the Accept-Language header,
      })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  getRepports(
    fileId: Number,
    treatId: Number,
    planId: Number
  ): Observable<any> {
    return this.http
      .get(
        `${this.apiBaseUrl}/api/private/get-plan-file?fileId=` +
          fileId +
          "&treatId=" +
          treatId +
          "&planId=" +
          planId,
        {
          responseType: "blob",
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  addPlan(treatId: any, comment: any, code: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/new-plan?treatId=` + treatId,
        { comment, code },

        {
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  addPlanFiles(data: any, id: any, role: string) {
    const photos: FileList = data;
    const formData = new FormData();

    if (data.length != 0) {
      for (let i = 0; i < photos.length; i++) {
        formData.append("files", photos[i]);
      }
    }

    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/add-plan-files?planId=` +
          id +
          "&role=" +
          role,
        formData,
        {
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  updateStatus(planId: Number, status: string): Observable<any> {
    console.log("plannn id", planId);
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/update-status?planId=${planId}`,
        status,
        {
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  updateDateDelevery(planId: any, date: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/update-delevery-date?planId=${planId}`,
        { deliveryDate: new Date(date) },
        {
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  updateFeedBack(planId: Number, feedBack: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/update-feedBack?planId=${planId}`,
        feedBack,
        {
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  updateProductionDelay(planId: Number, days: number): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/update-production-delay?planId=${planId}`,
        days,
        {
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  deletePlan(planId: Number): Observable<any> {
    return this.http
      .delete<any>(
        `${this.apiBaseUrl}/api/private/delete-plan?planId=${planId}`,

        {
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  deleteAllPlans(treatId: any): Observable<any> {
    return this.http
      .delete<any>(
        `${this.apiBaseUrl}/api/private/delete-all-plan?treatId=${treatId}`,
        {
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
