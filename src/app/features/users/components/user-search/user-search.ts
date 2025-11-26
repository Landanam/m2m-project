import { Component, output, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-search',
  imports: [CommonModule],
  templateUrl: './user-search.html',
})
export class UserSearchComponent {
  private destroyRef = inject(DestroyRef);
  private searchSubject = new Subject<string>();
  
  search = output<string>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(searchTerm => this.search.emit(searchTerm));
  }

  protected onSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.searchSubject.next(event.target.value);
    }
  }
}
