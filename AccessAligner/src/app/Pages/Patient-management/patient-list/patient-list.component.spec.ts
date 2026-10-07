import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PatientListComponent } from "./patient-list.component";
import { PatientService } from "../../../Core/Services/PatientService/patient.service";
import { HttpClient, HttpHandler } from "@angular/common/http";

describe("PatientListComponent", () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientListComponent],
      providers: [PatientService, HttpClient, HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
