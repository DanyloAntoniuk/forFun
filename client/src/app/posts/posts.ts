export interface PostApi {
  posts: Post[],
  count: number,
  hasMore: boolean,
}

export interface Post {
  title: string,
  author: Object,
  status: string,
  createdAt: string,
  updatedAt: string,
}