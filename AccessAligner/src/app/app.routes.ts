import { Routes } from "@angular/router";
import { LayoutContainerComponent } from "./Layout/layout-container/layout-container.component";
import { PublicLayoutComponent } from "./Layout/public-layout/public-layout.component";
import { ForgetPasswordComponent } from "./Auth/forget-password/forget-password.component";
import { SignInComponent } from "./Auth/sign-in/sign-in.component";
import { SignUpComponent } from "./Auth/sign-up/sign-up.component";
import { UpdatePasswordComponent } from "./Auth/update-password/update-password.component";
import { WaitingComponent } from "./Auth/waiting/waiting.component";
import { AuthGuard } from "./Core/Guards/auth.guard";
import { AdminDecisionComponent } from "./Auth/admin-decision/admin-decision.component";
import { ConfirmationComponent } from "./Auth/confirmation/confirmation.component";
import { OfflineComponent } from "./Shared/Pages/offline/offline.component";
import { LockedScreenComponent } from "./Shared/Pages/locked-screen/locked-screen.component";
import { Error403Component } from "./Shared/Pages/error403/error403.component";
import { Error500Component } from "./Shared/Pages/error500/error500.component";
import { Error503Component } from "./Shared/Pages/error503/error503.component";
import { ProfileComponent } from "./Pages/Profiles-management/profile/profile.component";
import { OverviewComponent } from "./Pages/Profiles-management/overview/overview.component";
import { ScheduleComponent } from "./Pages/Profiles-management/schedule/schedule.component";
import { SettingsComponent } from "./Pages/Profiles-management/settings/settings.component";
import { PatientListComponent } from "./Pages/Patient-management/patient-list/patient-list.component";
import { PatientComponent } from "./Pages/Patient-management/patient/patient.component";
import { PatientDetailComponent } from "./Pages/Patient-management/patient-detail/patient-detail.component";
import { AddNewPatientComponent } from "./Pages/Patient-management/add-new-patient/add-new-patient.component";
import { UpdatePatientComponent } from "./Pages/Patient-management/update-patient/update-patient.component";
import { TreatmentComponent } from "./Pages/Treatment-management/treatment/treatment.component";
import { AddNewTreatmentComponent } from "./Pages/Treatment-management/add-new-treatment/add-new-treatment.component";
import { NewTreatPatientComponent } from "./Components/New Treatment/new-treat-patient/new-treat-patient.component";
import { NewTreatGeneralComponent } from "./Components/New Treatment/new-treat-general/new-treat-general.component";
import { NewTreatPhotosComponent } from "./Components/New Treatment/new-treat-photos/new-treat-photos.component";
import { NewTreatClinicsComponent } from "./Components/New Treatment/new-treat-clinics/new-treat-clinics.component";
import { NewTreatTeethComponent } from "./Components/New Treatment/new-treat-teeth/new-treat-teeth.component";
import { ComingPageComponent } from "./Shared/Pages/coming-page/coming-page.component";
import { TreatmentsComponent } from "./Pages/Treatment-management/treatments/treatments.component";
import { TreatmentDetailsComponent } from "./Pages/Treatment-management/treatment-details/treatment-details.component";
import { ArchiveTreatmentsComponent } from "./Pages/Treatment-management/archive-treatments/archive-treatments.component";
import { PlanComponent } from "./Pages/Plans-management/plan/plan.component";
import { AddNewPlanComponent } from "./Pages/Plans-management/add-new-plan/add-new-plan.component";
import { UsersPageComponent } from "./Pages/User-Management/users-page/users-page.component";
import { UsersOverviewComponent } from "./Pages/User-Management/users-overview/users-overview.component";
import { ListUsersComponent } from "./Pages/User-Management/list-users/list-users.component";
import { NewAdminComponent } from "./Pages/User-Management/new-admin/new-admin.component";
import { ListDoctorsComponent } from "./Pages/User-Management/list-doctors/list-doctors.component";
import { ArchiveDoctorsComponent } from "./Pages/User-Management/archive-doctors/archive-doctors.component";
import { DashboardComponent } from "./Pages/Dashbording/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: "",
    component: LayoutContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "treatment/list", pathMatch: "full" },
      {
        path: "dashboard",
        title: "Dashboard page. ",
        component: DashboardComponent,
      },

      { path: "coming", component: ComingPageComponent },

      {
        path: "profile/:id",
        title: "User Profile page. ",
        component: ProfileComponent,
        children: [
          {
            path: "overview",
            title: "Overview page. ",
            component: OverviewComponent,
          },
          {
            path: "schedule",
            title: "Schedule page. ",
            component: ScheduleComponent,
          },
          {
            path: "settings",
            title: "Settings page. ",
            component: SettingsComponent,
          },
          { path: "", redirectTo: "overview", pathMatch: "full" },
        ],
      },
      {
        path: "patients",
        title: "Patient page. ",
        component: PatientComponent,
        children: [
          {
            path: "",
            title: "Patient List page. ",
            component: PatientListComponent,
          },
          {
            path: "detail/:id",
            title: "Patient Detail page. ",
            component: PatientDetailComponent,
          },
          {
            path: "update/:id",
            title: "UpdatePatient page. ",
            component: UpdatePatientComponent,
          },
          {
            path: "new-patient",
            title: "New Patient page. ",
            component: AddNewPatientComponent,
          },
        ],
      },
      {
        path: "treatment",
        title: "Treatment page. ",
        component: TreatmentComponent,
        children: [
          {
            path: "new-treatment/:id",
            title: "New Treatment page. ",
            component: AddNewTreatmentComponent,
            children: [
              { path: "", redirectTo: "patient", pathMatch: "full" },

              {
                path: "patient",
                title: "Patient Infos page. ",
                component: NewTreatPatientComponent,
              },
              {
                path: "general",
                title: "Treatment Infos page. ",
                component: NewTreatGeneralComponent,
              },
              {
                path: "teeth",
                title: "Teeth Infos page. ",
                component: NewTreatTeethComponent,
              },
              {
                path: "photos",
                title: "Photographes page. ",
                component: NewTreatPhotosComponent,
              },
              {
                path: "clinics",
                title: "Clinics page. ",
                component: NewTreatClinicsComponent,
              },
            ],
          },

          {
            path: "list",
            title: "Treatments page. ",
            component: TreatmentsComponent,
          },
          {
            path: "archive",
            title: "Archive treatments page. ",
            component: ArchiveTreatmentsComponent,
          },

          {
            path: ":id",
            title: "Treatment details page. ",
            component: TreatmentDetailsComponent,
          },
        ],
      },

      {
        path: "plan",
        title: "Plan Pages",
        component: PlanComponent,
        children: [
          {
            path: "new-plan/:id",
            title: "New Plan",
            component: AddNewPlanComponent,
          },
          {
            path: "detail/:id",
            title: "Detail Plan",
            component: AddNewPlanComponent,
          },
        ],
      },

      {
        path: "users",
        title: "Admin Page",
        component: UsersPageComponent,
        children: [
          {
            path: "overview",
            title: "OverView",
            component: UsersOverviewComponent,
            children: [
              {
                path: "doctors",
                title: "List Doctors",
                component: ListDoctorsComponent,
              },
              {
                path: "archive-doctors",
                title: "Archive Doctors",
                component: ArchiveDoctorsComponent,
              },

              {
                path: "list",
                title: "List",
                component: ListUsersComponent,
              },
              {
                path: "new-admin",
                title: "New Admin",
                component: NewAdminComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "",
    component: PublicLayoutComponent,
    children: [
      /*       { path: "", redirectTo: "sign-in", pathMatch: "full" },
       */
      {
        path: "sign-in",
        title: "Sign In page. ",
        component: SignInComponent,
      },
      {
        path: "sign-up",
        title: "Sign up page. ",
        component: SignUpComponent,
      },

      {
        path: "waiting",
        title: "Waiting page. ",
        component: WaitingComponent,
      },
      {
        path: "forgot-password",
        title: "ForgetPassword page. ",
        component: ForgetPasswordComponent,
      },

      {
        path: "update-password/:token",
        title: "Update password  page. ",
        component: UpdatePasswordComponent,
      },
      {
        path: "confirm/:token",
        title: "Confirmation page. ",
        component: ConfirmationComponent,
      },
      {
        path: "decision/:token/:user",
        title: "Administration page. ",
        component: AdminDecisionComponent,
      },
      {
        path: "403",
        title: "FORBIDDON. ",
        component: Error403Component,
      },
      {
        path: "500",
        title: "ERROR 500. ",
        component: Error500Component,
      },
      {
        path: "503",
        title: "ERROR 503. ",
        component: Error503Component,
      },
      {
        path: "offline",
        title: "SHUTDOWN. ",
        component: OfflineComponent,
      },
      {
        path: "locked",
        title: "LOCKED. ",
        component: LockedScreenComponent,
      },
    ],
  },
];
