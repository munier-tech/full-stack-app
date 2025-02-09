export interface iDeleteCommentResponse {
  message:        string;
  isSuccess:      boolean;
  deletedComment: DeletedComment;
}

export interface DeletedComment {
  id:         string;
  comment:    string;
  created_at: Date;
  updated_at: Date;
  is_edited:  boolean;
  article_id: number;
  user_id:    number;
}
