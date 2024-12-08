export interface IDeliveryQuery {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minEta?: Date;
  maxEta?: Date;
}
