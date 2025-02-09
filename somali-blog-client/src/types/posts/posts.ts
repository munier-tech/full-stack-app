export interface iCreatePostResponse {
  message:     string;
  isSuccess:   boolean;
  createdPost: CreatedPost;
}


export interface CreatedPost {
  id:         string;
  title:      string;
  content:    string;
  desc:       string;
  user_id:    number;
  created_at: Date;
  updated_at: Date;
}



export interface iCreataPostPayload {
  title:   string;
  content: string;
  desc :  string
}


