export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: {
    url: string;
  };
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
    avatar: {
      url: string;
    };
  };
}
