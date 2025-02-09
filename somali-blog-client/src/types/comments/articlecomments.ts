export interface iArticleCommentResponse {
  isSuccess: boolean;
  comments:  Comment[];
  users : {
    id : number;
    fullname : string
  }
  page:      string;
  size:      string;
}

export interface Comment {
  id:         string;
  comment:    string;
  created_at: Date;
  users : {
    id : number;
    fullname : string
  }
  updated_at: Date;
  is_edited:  boolean;
  article_id: number;
  user_id:    number;
 
}
