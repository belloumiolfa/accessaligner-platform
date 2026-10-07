export interface MenuItem {
  id?: number;
  key?: string;
  access?: any;
  label?: string;
  icon?: string;
  url?: string;
  collapsed?: boolean;
  children?: any;
  isTitle?: boolean;
  badge?: any;
  parentKey?: number;
  urlsChildrens?: any;
}
