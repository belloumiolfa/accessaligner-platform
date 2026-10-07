import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { environment } from "../../../../environments/environment.development";
import { map } from "rxjs";
import { loggedInUser } from "../../Helpers/utils";

@Injectable({
  providedIn: "root",
})
export class DashboardRequetsService {
  apiBaseUrl = environment.apiBaseUrl;
  lang!: any;
  constructor(private http: HttpClient, private translate: TranslateService) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  getTotalTreatments() {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/dashboard/getTotalTreats`, {
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
  getTotalTreatsByStatus(status: string) {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/dashboard/getTotalTreatsByStatus?status=` +
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
  getTotalDentist() {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/dashboard/getTotalDentist`, {
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
  getTotalPatient() {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/dashboard/getTotalPatient`, {
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
  getTopDentist() {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/dashboard/getTopDentist`, {
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

  getTreatStatisticsYear(year: number) {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/dashboard/getTreatStatisticsYear?year=${year}`,
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
  getPlanStatisticsYear(year: number) {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/dashboard/getPlanStatisticsYear?year=${year}`,
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
