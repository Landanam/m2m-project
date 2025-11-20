export class PaginationUtils {
  static readonly DEFAULT_PAGE_SIZE = 25;
  static readonly PAGE_SIZE_OPTIONS = [25, 50, 100];

  static paginate<T>(items: T[], page: number, pageSize: number): T[] {
    const start = page * pageSize;
    return items.slice(start, start + pageSize);
  }

  static getTotalPages(totalItems: number, pageSize: number): number {
    return Math.ceil(totalItems / pageSize);
  }

  static canGoNext(currentPage: number, totalPages: number): boolean {
    return currentPage < totalPages - 1;
  }

  static canGoPrevious(currentPage: number): boolean {
    return currentPage > 0;
  }
}
