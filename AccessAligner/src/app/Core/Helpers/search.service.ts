import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor() {}

  searchByPatient(searchTerm: any, table: any): any[] {
    const searchTermLower = searchTerm.toLowerCase();

    let filteredTable = table.filter(
      (data: {
        patient: {
          firstName: string | string[];
          lastName: string | string[];
        };
      }) => {
        const firstNameLower = (data.patient.firstName as string).toLowerCase();
        const lastNameLower = (data.patient.lastName as string).toLowerCase();
        return (
          firstNameLower.includes(searchTermLower) ||
          lastNameLower.includes(searchTermLower) ||
          `${firstNameLower} ${lastNameLower}`.includes(searchTermLower)
        );
      }
    );

    return filteredTable;
  }

  searchPatient(searchTerm: any, table: any): any[] {
    const searchTermLower = searchTerm.toLowerCase();

    let filteredTable = table.filter(
      (data: { firstName: string | string[]; lastName: string | string[] }) => {
        const firstNameLower = (data.firstName as string).toLowerCase();
        const lastNameLower = (data.lastName as string).toLowerCase();
        return (
          firstNameLower.includes(searchTermLower) ||
          lastNameLower.includes(searchTermLower) ||
          `${firstNameLower} ${lastNameLower}`.includes(searchTermLower)
        );
      }
    );

    return filteredTable;
  }

  searchUser(searchTerm: any, table: any): any[] {
    const searchTermLower = searchTerm.toLowerCase();

    let filteredTable = table.filter(
      (data: { profile: any; userName: string }) => {
        const userNameLower = (data.userName as string).toLowerCase();
        const firstNameLower = data.profile.lastName
          ? (data.profile.firstName as string).toLowerCase()
          : "";
        const lastNameLower = data.profile.lastName
          ? (data.profile.lastName as string).toLowerCase()
          : "";

        return (
          userNameLower.includes(searchTermLower) ||
          firstNameLower.includes(searchTermLower) ||
          lastNameLower.includes(searchTermLower)
        );
      }
    );

    return filteredTable;
  }
}
