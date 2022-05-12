export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export class PaginatedResponse<T> {
  items: T;
  pagination: Pagination;

  constructor(items: T, pagination: Pagination) {
    this.items = items;
    this.pagination = pagination;
  }
}
