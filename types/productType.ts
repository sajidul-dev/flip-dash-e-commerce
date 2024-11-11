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
