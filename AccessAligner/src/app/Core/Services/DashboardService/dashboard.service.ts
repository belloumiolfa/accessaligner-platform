import { Injectable } from "@angular/core";
import { DashboardRequetsService } from "../../Requests/Dashboarding/dashboard-requets.service";
import { TranslateService } from "@ngx-translate/core";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Helpers/handle-errors.service";
import { AppService } from "../app.service";
import { TreatmentService } from "../TreatService/treatment.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private dashboardRequest: DashboardRequetsService) {}

  totalTreats$ = new BehaviorSubject<number>(0);
  getTotalTreats$ = this.totalTreats$.asObservable();
  setTotalTreats$(total: any) {
    this.totalTreats$.next(total);
  }
  getTotalTreatments() {
    this.dashboardRequest.getTotalTreatments().subscribe(
      (data) => {
        this.setTotalTreats$(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  totalTreatsByStatus$ = new BehaviorSubject<number>(0);
  getTotalTreatsByStatus$ = this.totalTreatsByStatus$.asObservable();
  setTotalTreatsByStatus$(total: any) {
    this.totalTreatsByStatus$.next(total);
  }
  getTotalTreatsByStatus(status: string) {
    this.dashboardRequest.getTotalTreatsByStatus(status).subscribe(
      (data) => {
        this.setTotalTreatsByStatus$(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  totalDentist$ = new BehaviorSubject<number>(0);
  getTotalDentist$ = this.totalDentist$.asObservable();
  setTotalDentist$(total: any) {
    this.totalDentist$.next(total);
  }
  getTotalDentist() {
    this.dashboardRequest.getTotalDentist().subscribe(
      (data) => {
        this.setTotalDentist$(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  totalPatient$ = new BehaviorSubject<number>(0);
  getTotalPatient$ = this.totalPatient$.asObservable();
  setTotalPatient$(total: any) {
    this.totalPatient$.next(total);
  }
  getTotalPatient() {
    this.dashboardRequest.getTotalPatient().subscribe(
      (data) => {
        this.setTotalPatient$(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  topDentist$ = new BehaviorSubject<any[]>([]);
  getTopDentist$ = this.topDentist$.asObservable();
  setTopDentist$(dentists: any) {
    this.topDentist$.next(dentists);
  }
  getTopDentist() {
    this.dashboardRequest.getTopDentist().subscribe(
      (data) => {
        this.setTopDentist$(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  treatStatistic$ = new BehaviorSubject<any[]>([]);
  getTreatStatistic$ = this.treatStatistic$.asObservable();
  setTreatStatistic$(dentists: any) {
    this.treatStatistic$.next(dentists);
  }
  getTreatStatisticsYear(year: number) {
    this.dashboardRequest.getTreatStatisticsYear(year).subscribe(
      (data) => {
        this.setTreatStatistic$(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  planStatistic$ = new BehaviorSubject<any[]>([]);
  getPlanStatistic$ = this.planStatistic$.asObservable();
  setPlanStatistic$(dentists: any) {
    this.planStatistic$.next(dentists);
  }
  getPlanStatisticsYear(year: number) {
    this.dashboardRequest.getTreatStatisticsYear(year).subscribe(
      (data) => {
        this.setPlanStatistic$(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
