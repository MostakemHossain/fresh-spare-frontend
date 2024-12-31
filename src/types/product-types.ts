export interface Category {
  _id: string;
  name: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  image: string;
  category: Category[];
}

export interface Product {
  _id: string;
  name: string;
  // Add other product properties as needed
}

export interface ProductResponse {
  success: boolean;
  data: {
    data: Product[];
    page: number;
  };
  totalCount: number;
}

export interface ProductQueryParams {
  category: string | null;
  subCategory: string | null;
  page: number;
  limit: number;
}
