import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepsService {
  constructor() {}

  clickedIndex$ = new BehaviorSubject<number>(0);

  detectedChanges$ = new BehaviorSubject<boolean>(false);

  clickedSave$ = new BehaviorSubject<boolean>(false);

  disabledSteps$ = new BehaviorSubject<boolean>(true);

  disabledStepsTreatment$ = new BehaviorSubject<boolean>(true);

  // getDetectedChanges$ = this.detectedChanges$.asObservable();

  getClickedIndex$ = this.clickedIndex$.asObservable();
  steps = [
    {
      id: 1,
      label: 'Patient Information',
      url: 'patient',
      done: false,
      current: false,
    },
    {
      id: 2,
      label: 'Treatment Information',
      url: 'general',
      done: false,
      current: false,
    },
    {
      id: 3,
      label: 'Teeth Information',
      url: 'teeth',
      done: false,
      current: false,
    },
    {
      id: 4,
      label: 'Photographs and x-rays',
      url: 'photos',
      done: false,
      current: false,
    },
    {
      id: 5,
      label: 'Clinics ',
      url: 'clinics',
      done: false,
      current: false,
    },
  ];

  getDetectedChanges$ = this.detectedChanges$.asObservable();
  getClickedSave$ = this.clickedSave$.asObservable();
  getDisabledSteps$ = this.disabledSteps$.asObservable();

  getDisabledStepsTreatment$ = this.disabledStepsTreatment$.asObservable();

  getSteps(): any[] {
    return this.steps;
  }

  markStepAsDone(stepIndex: number): void {
    if (stepIndex >= 0 && stepIndex < this.steps.length) {
      this.steps[stepIndex].done = true;
    }
  }

  markCurrentStep(stepIndex: any) {
    this.clickedIndex$.next(stepIndex);
  }

  markdetectedChange(detected: boolean) {
    this.detectedChanges$.next(detected);
    //  console.log('voila det from service : ', detected);
  }

  markCLikcedSave(clickedSave: boolean) {
    this.clickedSave$.next(clickedSave);
    // console.log('voila clickedsav? from s : ', clickedSave);
  }

  setDisabledSteps(disabledSteps: boolean) {
    this.disabledSteps$.next(disabledSteps);
  }

  setDisabledStepsTreatment(disabledSteps: boolean) {
    this.disabledStepsTreatment$.next(disabledSteps);
  }
}
