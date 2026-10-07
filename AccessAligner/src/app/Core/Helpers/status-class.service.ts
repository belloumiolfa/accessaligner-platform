import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatusClassService {
  constructor() {}

  getClassStatus(status: string) {
    switch (status) {
      case 'CONFIRMED ': {
        return 'bg-teal';
      }
      case 'FINISHED': {
        return 'bg-green';
      }

      case 'NEW': {
        return 'bg-grey';
      }

      case 'COMPLETED': {
        return 'bg-light-green';
      }

      case 'PROGRESS': {
        return 'bg-indigo';
        break;
      }

      case 'QUALIFIED': {
        return 'bg-cyan';
        break;
      }

      case 'UNQUALIFIED': {
        return 'bg-red';
        break;
      }
      case 'CONFIRMED': {
        return 'bg-blue';
      }

      case 'CANCELED': {
        return 'bg-deep-orange';
      }

      case 'WAIT': {
        return 'bg-lime';
      }
      case 'PRODUCTION': {
        return 'bg-brown';
      }

      case 'DELIVERED': {
        return 'bg-orange';
        break;
      }
      case 'REJECTED': {
        return 'bg-red';
      }
      case 'ACCEPTED': {
        return 'bg-deep-purple';
      }
    }

    return '';
  }

  getPCByStatus(status: string) {
    switch (status) {
      case 'FINISHED': {
        return '100%';
      }
      case 'ACCEPTED': {
        return '25%';
      }

      case 'NEW': {
        return '0%';
      }

      case 'CONFIRMED': {
        return '25%';
      }

      case 'PRODUCTION': {
        return '50%';
      }

      case 'DELIVERED': {
        return '75%';
        break;
      }
      case 'REJECTED': {
        return '100%';
        break;
      }
    }

    return '';
  }

  getClassPC(status: any) {
    switch (status) {
      case 'FINISHED': {
        return 'l-green';
      }

      case 'NEW': {
        return 'l-slategray';
      }

      case 'ACCEPTED': {
        return 'l-parpl';
      }
      case 'CONFIRMED': {
        return 'l-turquoise';
      }

      case 'PRODUCTION': {
        return 'l-amber';
      }

      case 'DELIVERED': {
        return 'l-khaki';
        break;
      }
      case 'REJECTED': {
        return 'l-coral';
        break;
      }
    }

    return '';
  }

  getClassStatusUser(status: any) {
    switch (status) {
      case 'WAIT': {
        return 'badge-warning';
      }

      case 'REJECTED': {
        return 'badge-primary';
      }

      case 'CONFIRMED': {
        return 'badge-info';
      }

      case 'ACCEPTED': {
        return 'badge-success';
      }

      case 'CANCELED': {
        return 'badge-danger';
      }
    }

    return '';
  }

  getClassAdmin(role: string) {
    switch (role) {
      case 'ADMIN': {
        return 'badge-default';
      }
      case 'SUPER_ADMIN': {
        return 'badge-primary';
      }
    }
    return '';
  }
}
