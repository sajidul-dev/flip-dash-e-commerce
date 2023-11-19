export interface CartItem {
  _id: string;
  title: string;
  category: string;
  comment: string;
  price: number;
  image: string;
  url: string;
  quantity?: number;
  totalPrice?: number;
}

export interface Product {
  _id: string;
  title: string;
  category: string;
  comment: string;
  price: number;
  image: string;
  url: string;
}
