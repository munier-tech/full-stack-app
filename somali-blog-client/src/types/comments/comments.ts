export interface iCreateCommentPayload {
  isSuccess: boolean;
  message:   string;
  comment:   Comment;
}

export interface Comment {
  id:         string;
  comment:    string;
  created_at: Date;
  updated_at: Date;
  is_edited:  boolean;
  article_id: number;
  user_id:    number;
}



export interface iCreateCommentBody {
  comment:   string;
  articleId: number;
}
