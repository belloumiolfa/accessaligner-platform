import { Routes } from "@angular/router";
import { LayoutComponent } from "./Pages/Layout/layout/layout.component";
import { HomeComponent } from "./Pages/home/home.component";
import { AboutAsComponent } from "./Pages/about-as/about-as.component";
import { AlignersComponent } from "./Pages/aligners/aligners.component";
import { WhyAccessAlignerComponent } from "./Pages/why-access-aligner/why-access-aligner.component";
import { FaqComponent } from "./Pages/faq/faq.component";
import { BlogComponent } from "./Pages/blog/blog.component";
import { PostComponent } from "./Pages/post/post.component";
import { NotFoundPageComponent } from "./Pages/not-found-page/not-found-page.component";
import { ClinicCaseComponent } from "./Pages/clinic-case/clinic-case.component";

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "about", component: AboutAsComponent },
      { path: "aligners", component: AlignersComponent },
      { path: "why", component: WhyAccessAlignerComponent },
      { path: "faq", component: FaqComponent },
      { path: "blog", component: BlogComponent },
      { path: "caces", component: ClinicCaseComponent },
      { path: "post/:id", component: PostComponent },
      { path: "", redirectTo: "/home", pathMatch: "full" }, // Optional: default route
      { path: "**", component: NotFoundPageComponent }, // Redirects to 404 page if no match found
    ],
  },
  { path: "", redirectTo: "/home", pathMatch: "full" }, // Optional: default route
];
