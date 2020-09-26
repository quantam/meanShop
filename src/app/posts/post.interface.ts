export interface Post {
  _id ?: string;
  title: string;
  content: string;
  imagePath: any;
}

export interface PostResponse{
  message: string;
  post: Post;
}
