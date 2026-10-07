import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../Models/user.models";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { TreatmentRequestsService } from "../Requests/Treatment/treatment-requests.service";

@Injectable({
  providedIn: "root",
})
export class AppService {
  imageUrl!: SafeUrl;

  private user$ = new BehaviorSubject({});
  private photo$ = new BehaviorSubject({});
  private patients$ = new BehaviorSubject<any[]>([]);
  private patient$ = new BehaviorSubject({});
  private treatment$ = new BehaviorSubject({});
  private treatments$ = new BehaviorSubject<any[]>([]);
  private treatPhotos$ = new BehaviorSubject<any[]>([]);
  private treatClinics$ = new BehaviorSubject([]);
  private treatByDoctors$ = new BehaviorSubject({});
  private patientsByDoctors$ = new BehaviorSubject({});
  private treatsByPatient$ = new BehaviorSubject({});
  private showSpinner$ = new BehaviorSubject<boolean>(false);
  private plan$ = new BehaviorSubject({});
  private nbrPatients$ = new BehaviorSubject<number>(0);
  private nbrTreatments$ = new BehaviorSubject<number>(0);
  private nbrTreatmentsArchive$ = new BehaviorSubject<number>(0);
  private messages$ = new BehaviorSubject<any[]>([]);

  errors: any;

  constructor(
    private sanitizer: DomSanitizer,
    private treatmentRequests: TreatmentRequestsService
  ) {}

  getUser$ = this.user$.asObservable();
  getPhoto$ = this.photo$.asObservable();
  getPatients$ = this.patients$.asObservable();
  getPatient$ = this.patient$.asObservable();
  getTreatment$ = this.treatment$.asObservable();
  getTreatments$ = this.treatments$.asObservable();
  getTreatPhotos$ = this.treatPhotos$.asObservable();
  getTreatClinics$ = this.treatClinics$.asObservable();
  getTreatByDoctors$ = this.treatByDoctors$.asObservable();
  getPatientsByDoctors$ = this.patientsByDoctors$.asObservable();
  getTreatsByPatient$ = this.treatsByPatient$.asObservable();
  getShowSpinner$ = this.showSpinner$.asObservable();
  getPlan$ = this.plan$.asObservable();

  getNbrPatients$ = this.nbrPatients$.asObservable();
  getNbrTreatments$ = this.nbrTreatments$.asObservable();
  getNbrTreatmentsArchive$ = this.nbrTreatmentsArchive$.asObservable();
  getMesssages$ = this.messages$.asObservable();

  setUser$(user: any) {
    this.user$.next(user);
  }

  setPhoto$(photo: any) {
    this.photo$.next(photo);
  }

  setPatients$(data: any) {
    this.patients$.next(data);
  }

  setPatient$(patientData: any) {
    if (Object.keys(patientData).length > 0) {
      let patients: any[] = [];
      // UPDATE TREATMENT IN LIST TREATMENT
      this.getPatients$.subscribe((data) => {
        patients = data.filter(
          (patient: any) => patient.id !== patientData?.id
        );
      });

      this.patients$.next([...patients, { ...patientData }]);
    }
    this.patient$.next(patientData);
  }

  setTreatment(data: any) {
    console.log(data);

    const treatment = {
      ...data,
      lengthClinics: data?.clinics!?.length,
      lengthPhotos: data?.photos!?.length,
    };
    if (Object.keys(data).length > 0) {
      let treatments: any[] = [];
      // UPDATE TREATMENT IN LIST TREATMENT
      this.getTreatments$.subscribe((data) => {
        treatments = data.filter((treat: any) => treat.id !== treatment?.id);
      });

      this.treatments$.next([...treatments, { ...treatment }]);
    }
    // UPDATE TREATMENT
    this.treatment$.next(treatment);
  }

  getTreatPhotos(files: any, treatId: any) {
    let existedPhotos: any[] = [];
    this.setSHowSpinner(true);
    files?.forEach((file: any) => {
      this.treatmentRequests
        .getTreatPhoto(file.id, treatId)
        .subscribe((data) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            let photo = {
              resource: this.sanitizer.bypassSecurityTrustUrl(
                URL.createObjectURL(data)
              ),
              id: file.id,
              name: file.name,
              type: file.type,
            };

            existedPhotos.push(photo);
          };
          reader.readAsDataURL(data);

          this.setSHowSpinner(false);
        });
    });

    return existedPhotos;
  }

  setSHowSpinner(show: boolean) {
    this.showSpinner$.next(show);
  }

  getFilesPlan(files: any, treatId: any) {
    let existedPhotos: any[] = [];

    files?.forEach((file: any) => {
      this.treatmentRequests
        .getTreatPhoto(file.id, treatId)

        .subscribe((data) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            let photo = {
              resource: this.sanitizer.bypassSecurityTrustUrl(
                URL.createObjectURL(data)
              ),
              id: file.id,
              name: file.name,
              type: file.type,
            };

            existedPhotos.push(photo);
          };

          reader.readAsDataURL(data);
        });
    });

    return existedPhotos;
  }

  setTreatPhotos(photos: any) {
    this.treatPhotos$.next(photos);
  }

  setTreatClinics(clinics: any) {
    this.treatClinics$.next(clinics);
  }

  setTreatments(data: any) {
    this.treatments$.next(data);
  }

  setTreatmentsByDoctor$(data: any) {
    this.treatByDoctors$.next(data);
  }

  setPatientsByDoctor$(data: any) {
    this.patientsByDoctors$.next(data);
  }

  setTreatmentsByPatient$(data: any) {
    this.treatsByPatient$.next(data);
  }

  setPlan$(data: any) {
    this.plan$.next(data);
  }

  setNbrPatients(length: number) {
    this.nbrPatients$.next(length);
  }
  setNbrTreatments(length: number) {
    this.nbrTreatments$.next(length);
  }

  setNbrTreatmentsArchive(length: number) {
    this.nbrTreatmentsArchive$.next(length);
  }
  setMessages$(messages: any) {
    this.messages$.next(messages);
  }
  addMessages(message: any) {
    let messages!: any;
    this.getMesssages$.subscribe((data) => (messages = data));

    this.messages$.next([...messages, message]);
  }
}
