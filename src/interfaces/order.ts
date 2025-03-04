export interface OrderQuery {
  id?: number;
  status?: string;
  minTotal?: string;
  maxTotal?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  userId?: number;
}

export interface CreateOrderData {
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentIntentId: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  userId: number;
}
