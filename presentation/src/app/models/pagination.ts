export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalpages: number;
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

export class PagingParams {
  pageNumber: number;
  pageSize: number;

  constructor(pageNumber = 1, pageSize = 2) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
