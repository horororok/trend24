export interface BookType {
  bookId: number;
  productId: number;
  searchKeyword: string;
  totalClickCount: number;
  totalOrderCount: number;
  totalOrderAmount: number;
  contents: string;
  productName: string;
  salePrice: number;
  categoryName: string;
  totalPurchaseCount: number;
  keywords: string[];
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}