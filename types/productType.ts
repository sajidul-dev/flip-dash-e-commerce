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

interface ProductProperty {
  propertyName: string;
  propertyValue: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  properties: ProductProperty[];
  url: string;
  shopId: string;
  quantity: number;
  shopName: string;
  shopProfilePic: string;
  shopAddress: string;
  reviews: any[]; // Replace `any` with a more specific type if you have a defined structure for reviews
}
