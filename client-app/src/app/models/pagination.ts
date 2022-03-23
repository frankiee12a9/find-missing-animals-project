export interface PaginatedData {
	currentPage: number
	pageSize: number
	totalPages: number
	totalCount: number
}

export class PaginatedResponse<T> {
	items: T
	paginatedData: PaginatedData
	constructor(items: T, paginatedData: PaginatedData) {
		this.items = items
		this.paginatedData = paginatedData
	}
}
