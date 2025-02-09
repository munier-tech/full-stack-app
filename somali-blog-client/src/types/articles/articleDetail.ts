export interface iArticleDetailResponse {
  message: string;
  article: Article;
}

export interface Article {
  id:           number;
  title:        string;
  content:      string;
  is_published: boolean;
  created_at:   Date;
  updated_at:   Date;
  user_id:      number;
  user:         User;
}

export interface User {
  id:       number;
  fullname: string;
}
