import { ROLE } from "@prisma/client";

export interface IRegisterUser {
  email: string;
  fullname: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}



export interface IUpdateUser {
  email :  string;
  role : ROLE
}

