export interface CartItem {
  _id: number;
  title: string;
  comment: string;
  image: string;
  price: number;
}

export interface Product {
  _id: number;
  title: string;
  category: string;
  comment: string;
  price: number;
  image: string;
}
