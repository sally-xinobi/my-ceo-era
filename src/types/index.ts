export type Id = string | number;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface BaseEntity {
  id: Id;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorDetail {
  field?: string;
  message: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
