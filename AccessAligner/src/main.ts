/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment.development';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// To Disable all consoles in production=true
if (environment.production) {
  window.console.log = () => {};
}
