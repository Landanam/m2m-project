import { Injectable } from '@angular/core';

export type SortDirection = 'asc' | 'desc';
export type FieldType = 'number' | 'string' | 'date';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  sort<T>(items: T[], field: keyof T, direction: SortDirection, fieldType: FieldType): T[] {
    if (!items.length) return items;

    return [...items].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      switch (fieldType) {
        case 'number':
          return this.sortNumbers(Number(aVal), Number(bVal), direction);
        case 'date':
          return this.sortDates(aVal as string, bVal as string, direction);
        case 'string':
        default:
          return this.sortStrings(aVal as string, bVal as string, direction);
      }
    });
  }

  private compare<T>(a: T, b: T, direction: SortDirection): number {
    if (a < b) return direction === 'asc' ? -1 : 1;
    if (a > b) return direction === 'asc' ? 1 : -1;
    return 0;
  }

  private sortNumbers(a: number, b: number, direction: SortDirection): number {
    return this.compare(a, b, direction);
  }

  private sortStrings(a: string, b: string, direction: SortDirection): number {
    return this.compare(a.toLowerCase(), b.toLowerCase(), direction);
  }

  private sortDates(a: string, b: string, direction: SortDirection): number {
    return this.compare(new Date(a).getTime(), new Date(b).getTime(), direction);
  }
}
