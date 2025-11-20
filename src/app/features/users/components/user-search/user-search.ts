import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-search',
  imports: [CommonModule],
  templateUrl: './user-search.html',
})
export class UserSearchComponent {
  search = output<string>();

  onSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.search.emit(event.target.value);
    }
  }
}
