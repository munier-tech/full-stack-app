export interface iDeleteArticleResponse {
  message: string;
  article: {
    id:           number;
    title:        string;
    content:      string;
    is_published: boolean;
    created_at:   Date;
    updated_at:   Date;
    user_id:      number;
  }
}

 
