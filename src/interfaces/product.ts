export interface ProductQuery {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  outOfStock?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  searchTerm?: string;
}
