export interface PostApi {
  posts: Post[];
  count: number;
  hasMore: boolean;
}

export interface Post {
  _id: string;
  title: string;
  author: object;
  status: string;
  createdAt: string;
  updatedAt: string;
}
