export interface iListArticleResponse {
  isSuccess: boolean;
  articles:  Article[];
}

export interface Article {
  id:           number;
  title:        string;
  content:      string;
  is_published: boolean;
  created_at:   Date;
  updated_at:   Date;
  user_id:      number;
}
