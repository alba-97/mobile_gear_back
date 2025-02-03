export default interface IOrderQuery {
  status?: string;
  minTotalPrice?: number;
  maxTotalPrice?: number;
  userId?: number;
  startDate?: string;
  endDate?: string;
}
