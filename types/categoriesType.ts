export interface Categories {
  _id: any;
  name: string;
  __v: number;
  parentCategory?: {
    _id: string;
    name: string;
    __v: number;
  };
}
