export interface CartItem {
  _id: string;
  title: string;
  category: string;
  comment: string;
  price: number;
  image: string;
  url: string;
  itemQuantity?: number;
  itemTotal?: number;
  productList?: any;
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
