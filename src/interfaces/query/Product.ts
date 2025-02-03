export default interface IProductQuery {
  modelName?: string;
  categoryName?: string;
  minPrice?: number;
  maxPrice?: number;
  brandName?: string;
  minDiscount?: number;
  maxDiscount?: number;
}
