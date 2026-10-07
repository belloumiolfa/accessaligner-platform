import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { loggedInUser } from "../../Helpers/utils";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class TreatmentRequestsService {
  apiBaseUrl = environment.apiBaseUrl;
  lang!: any;
  constructor(private http: HttpClient, private translate: TranslateService) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  addTreatInfo(data: any, patientId: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/treatment/add-information?patientId=` +
          patientId,

        { ...data },
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

  getTreatmentById(id: any): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/treatment/getTreatment?treatId=` + id,
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

  getInitPaatientTreat(id: Number): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/treatment/getCurrent?patientId=` + id,
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

  addTreatTeeth(data: any, id: any) {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/treatment/add-teeth?treatId=` + id,
        data,
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

  addTreatPhotos(data: any, id: any, role: string, comment: string) {
    const photos: FileList = data;
    const formData = new FormData();

    if (data.length != 0) {
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }
    }

    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/treatment/add-photographs?treatId=` +
          id +
          "&role=" +
          role +
          "&comment=" +
          comment,
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

  addTreatFile(data: any, id: any, role: string) {
    const formData = new FormData();
    formData.append("photo", data);

    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/treatment/add-file?treatId=` +
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

  getTreatPhoto(fileId: any, treatId: any): Observable<any> {
    return this.http
      .get(
        this.apiBaseUrl +
          "/api/private/treatment/get-file?fileId=" +
          fileId +
          "&treatId=" +
          treatId,
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

  deleteFile(id: any): Observable<any> {
    return this.http
      .delete(this.apiBaseUrl + "/api/private/treatment/delete-file?id=" + id, {
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

  updateTreatmentStatus(id: Number, status: string) {
    return this.http
      .post(
        this.apiBaseUrl +
          "/api/private/treatment/updateTreatStatus?treatId=" +
          id,
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

  getTreatments(): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/treatment/getTreatments`,
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

  deleteTreatment(id: Number): Observable<any> {
    return this.http
      .delete<any>(
        `${this.apiBaseUrl}/api/private/treatment/deleteTreatment?treatId=` +
          id,
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

  getTreatmentsByIdDoctor(idDoctor: any): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/treatment/getDoctorTreat?doctorId=` +
          idDoctor,
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

  getTreatmentsByPatientId(idPatient: any): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/treatment/getPatientTreat?patientId=` +
          idPatient,
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

  getLengthTreatmentsByUser(idUser: any) {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/treatment/get-nbr-treatment?userId=` +
          idUser,
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

  addTeam(treatId: Number, admins: any) {
    return this.http
      .post(
        this.apiBaseUrl + "/api/private/treatment/add-team?treatId=" + treatId,
        admins,
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

  removeTeam(treatId: Number, adminId: any) {
    return this.http
      .get(
        this.apiBaseUrl +
          "/api/private/treatment/remove-team?treatId=" +
          treatId +
          "&adminId=" +
          adminId,
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
  resetTeam(treatId: Number) {
    return this.http
      .get(
        this.apiBaseUrl +
          "/api/private/treatment/reset-team?treatId=" +
          treatId,
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
