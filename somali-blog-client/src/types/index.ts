
export interface ILoginResponse {
  isSuccess: boolean;
  user:      User;
  token:     string;
}

export interface User {
  id:           number;
  email:        string;
  fullname:     string;
  phone_number: string;
  created_at:   Date;
  updated_at:   Date;
}


 export interface ILoginBody{
  email : string,
  password : string
 }
  
   

export interface iRegisterBody {
  email:           string;
  fullname:        string;
  password:        string;
  confirmPassword: string;
}





 export interface iRegisterResponse{

  isSuccess: boolean;
  message:   string;
  newUser:   NewUser;
}

export interface NewUser {
  id:           number;
  email:        string;
  password:     string;
  fullname:     string;
  phone_number: string;
  created_at:   Date;
  updated_at:   Date;
  last_login:   null;
}
