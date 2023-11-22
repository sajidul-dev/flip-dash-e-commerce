export interface Property {
  propertyName: string;
  propertyValue: string;
}
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
  totalQuantity?: number;
  totalPrice?: number;
  productList?: any;
  properties?: Property[];
  quantity: number;
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
