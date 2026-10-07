import { MenuItem } from "../Models/menu.model";

const MENU_ITEMS: MenuItem[] = [
  {
    key: "navigation",
    access: ["ADMIN", "SUPER_ADMIN"],
    label: "layout.menu-labels.navigation-main",
    isTitle: true,
  },
  {
    key: "dashboard",
    access: ["ADMIN", "SUPER_ADMIN"],
    label: "layout.menu-labels.dashboard",
    isTitle: false,
    icon: "zmdi zmdi-home",
    url: "/",
  },
  {
    key: "treat",
    access: ["ADMIN", "SUPER_ADMIN", "DENTIST"],
    label: "layout.menu-labels.navigation-treatment",
    isTitle: true,
  },
  {
    key: "treat-patient",
    access: ["ADMIN", "SUPER_ADMIN", "DENTIST"],
    label: "layout.menu-labels.patient.label",
    isTitle: false,
    icon: "zmdi zmdi-accounts-list-alt",
    collapsed: true,
    url: "",
    children: [
      {
        key: "patient-list",
        access: ["ADMIN", "SUPER_ADMIN", "DENTIST"],
        label: "layout.menu-labels.patient.list",
        url: "/patients",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "treat-patient",
      },
      {
        key: "patient-new",
        access: ["DENTIST"],
        label: "layout.menu-labels.patient.new",
        url: "/patients/new-patient",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "treat-patient",
      },
    ],
  },
  {
    key: "treat-cases",
    access: ["ADMIN", "SUPER_ADMIN", "DENTIST"],
    label: "layout.menu-labels.treatment.label",
    isTitle: false,
    icon: "zmdi zmdi-folder-person",
    collapsed: true,
    children: [
      // add status to treatment list to filter treatments
      {
        key: "treat-list",
        access: ["ADMIN", "SUPER_ADMIN", "DENTIST"],
        label: "layout.menu-labels.treatment.list",
        url: "/treatment/list",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "treat-cases",
      },
      {
        key: "treat-archive",
        access: ["ADMIN", "SUPER_ADMIN", "DENTIST"],
        label: "layout.menu-labels.treatment.archive",
        url: "/treatment/archive",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "treat-cases",
      },
      {
        key: "treat-new-plan",
        access: ["DENTIST"],
        label: "layout.menu-labels.treatment.new",
        url: "treatment/new-treatment/null/patient",
        icon: "zmdi zmdi-arrow-right",
        parentKey: "treat-cases",
      },
    ],
  },

  {
    key: "user-management",
    access: ["ADMIN", "SUPER_ADMIN"],
    label: "layout.menu-labels.user-management.label",
    isTitle: false,
    icon: "zmdi zmdi-accounts",
    url: "/users/overview/doctors",
    urlsChildrens: [
      "/users/overview/doctors",
      "/users/overview/list",
      "/users/overview/new-admin",
      "/users/overview/archive-doctors",
    ],
  },
];

export { MENU_ITEMS };
