import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorsService {
  errors: any = {};
  errorsResult: any = {};
  constructor(private router: Router) {}

  handleError(err: any) {
    switch (err.status) {
      case 400:
        for (let error of err.error.errors) {
          //    console.log('test', this.errors[Object.keys(error)[0]]);
          this.errors[Object.keys(error)[0]] = error[Object.keys(error)[0]];
          //   this.errors = error;
        }
        break;
      case 500:
        console.log(err);
        this.router.navigate(['/500']);

        break;

      case 503:
        console.log(err);
        this.router.navigate(['/503']);

        break;
      case 403:
        console.log(err);
        //this.router.navigate(["/locked"]);
        break;

      default:
        console.log(err);
        //this.router.navigate(["/offline"]);
        // this.router.navigate(["/500"]);
        break;
    }

    this.errorsResult = this.errors;
    this.errors = {};

    return this.errorsResult;
  }
}
