export interface iCreateArticleResponse {
  isSuccess:  boolean;
  message:    string;
  newArticle: NewArticle;
}

export interface NewArticle {
  id:           number;
  title:        string;
  content:      string;
  is_published: boolean;
  created_at:   Date;
  updated_at:   Date;
  user_id:      number;
}


export interface iCreateArticlePayload {
  title:       string;
  content:     string;
  isPublished: boolean;
}
