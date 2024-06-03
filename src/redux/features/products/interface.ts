export interface IProductsData {
  status: boolean;
  data: IProduct[];
}

export interface IProduct {
  _id: number;
  name: string;
  image: string;
  price: number;
  features: string[];
  status: boolean;
  rating: number;
}
