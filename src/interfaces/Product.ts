export interface Product {
  name: string;
  price: number;
  type: string;
  description: string;
  brand: string;
  product_img: string;
  stock: number;
  discount: number;
}

export interface IProductQuery {
  modelName?: string;
  categoryName?: string;
  minPrice?: number;
  maxPrice?: number;
  brandName?: string;
  minDiscount?: number;
  maxDiscount?: number;
}
