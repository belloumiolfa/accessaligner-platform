export interface SignUpObject {
  id?: number;
  userName?: string;
  password?: string;
  email?: string;
  phone?: any;
  confirmPassword?: any;
  term?: any;
}

export interface updatePasswordObject {
  password?: string;
  confirmPassword?: string;
}
