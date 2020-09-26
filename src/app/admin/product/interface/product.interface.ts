export interface Product {
  _id ?: string;
  name: string;
  description: string;
  imagePath: any;
  stock: string;
}

export interface PostResponse{
  message: string;
  post: Product;
}
