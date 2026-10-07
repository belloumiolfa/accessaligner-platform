import { ApplicationConfig, ModuleWithProviders } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from "@angular/common/http";
import { NgCircleProgressModule } from "ng-circle-progress";
import { CountToModule } from "angular-count-to";
import { provideAnimations } from "@angular/platform-browser/animations";

import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { importProvidersFrom } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, "./assets/i18n/", ".json");

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule, [
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    provideAnimations(),

    //  importProvidersFrom(NgWizardModule.forRoot({})),
    (
      NgCircleProgressModule.forRoot(
        {}
      ) as ModuleWithProviders<NgCircleProgressModule>
    ).providers!,

    (CountToModule.forChild() as ModuleWithProviders<CountToModule>).providers!,
  ],
};
