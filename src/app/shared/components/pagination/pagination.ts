import { Component, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationUtils } from '../../../shared/utils/pagination.utils';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class PaginationComponent {
  allItems = input.required<any[]>();
  pageChange = output<any[]>();

  currentPage = signal(0);
  itemsPerPage = signal(PaginationUtils.DEFAULT_PAGE_SIZE);
  readonly paginationOptions = PaginationUtils.PAGE_SIZE_OPTIONS;

  totalPages = computed(() => PaginationUtils.getTotalPages(this.allItems().length, this.itemsPerPage()));
  canGoNext = computed(() => PaginationUtils.canGoNext(this.currentPage(), this.totalPages()));
  canGoPrevious = computed(() => PaginationUtils.canGoPrevious(this.currentPage()));
  paginatedItems = computed(() => PaginationUtils.paginate(this.allItems(), this.currentPage(), this.itemsPerPage()));

  constructor() {
    effect(() => {
      this.pageChange.emit(this.paginatedItems());
    });
  }

  protected onPrevious(): void {
    if (this.canGoPrevious()) {
      this.currentPage.update((page) => page - 1);
    }
  }

  protected onNext(): void {
    if (this.canGoNext()) {
      this.currentPage.update((page) => page + 1);
    }
  }

  protected onItemsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage.set(Number(target.value));
    this.currentPage.set(0);
  }
}
