export type CartInputs = {
  name: string;
  email: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  phone: string;
};

export interface Property {
  propertyName: string;
  propertyValue: string;
}
export interface CartItem {
  _id: string;
  userId: string;
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
