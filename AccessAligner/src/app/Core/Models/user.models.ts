export interface User {
  id?: number;
  userName?: string;
  password?: string;
  email?: string;
  createdAt?: Date;
  roleList?: any[];
  profile?: any;
  eventList?: any[];
  userStatus?: any;
  keepLoggedIn?: any;
}
