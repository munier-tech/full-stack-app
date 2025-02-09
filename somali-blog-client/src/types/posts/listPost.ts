export interface iListPostResponse {
  message:   string;
  isSuccess: boolean;
  listPosts: ListPost[];
}

export interface ListPost {
  id:         string;
  title:      string;
  content:    string;
  desc:       null | string;
  user_id:    number;
  created_at: Date;
  updated_at: Date;
  user:       User;
}

export interface User {
  id:       number;
  fullname: string;
  email:    string;
}
