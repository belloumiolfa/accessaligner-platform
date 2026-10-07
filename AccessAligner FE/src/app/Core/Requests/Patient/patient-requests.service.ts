import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { loggedInUser } from "../../Helpers/utils";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class PatientRequestsService {
  apiBaseUrl = environment.apiBaseUrl;

  lang!: any;
  constructor(private http: HttpClient, private translate: TranslateService) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  addPatient(patientData: any, id: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/add-patient?doctorId=` + id,
        patientData,
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
  getPatients(): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/get-patients`, {
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

  getPatient(id: any): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/get-patient?id=` + id, {
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

  updatePatient(patientData: any, id: any): Observable<any> {
    // console.log("patient data ",typeof patientData.birthday)
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/update-patient?id=` + id,
        patientData,
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

  deletePatient(id: any): Observable<any> {
    return this.http
      .delete<any>(`${this.apiBaseUrl}/api/private/delete-patient?id=` + id, {
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

  getPatientsByIdDoctor(doctorId: any): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/getDoctorPatients?doctorId=` + doctorId,
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

  getLengthPatientsByUser(idUser: any) {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/get-nbr-patients?userId=` + idUser,
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
