import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserTableField } from '../../models/user.model';
import { UserPresentationService } from '../../services/user-presentation.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserListComponent {
  private readonly userPresentation = inject(UserPresentationService);

  readonly users = input.required<User[]>();
  readonly sort = output<{ field: UserTableField; direction: 'asc' | 'desc' }>();
  readonly userSelect = output<User>();

  private readonly sortField = signal<UserTableField>('id');
  private readonly sortDirection = signal<'asc' | 'desc'>('asc');

  readonly onSort = (field: UserTableField): void => {
    if (this.sortField() === field) {
      this.sortDirection.update(dir => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
    this.sort.emit({ field: this.sortField(), direction: this.sortDirection() });
  };

  readonly onUserSelect = (user: User): void => {
    this.userSelect.emit(user);
  };

  readonly getSortIcon = (field: UserTableField): string => {
    if (this.sortField() !== field) return 'sort-none';
    return this.sortDirection() === 'asc' ? 'sort-asc' : 'sort-desc';
  };

  readonly isNewUser = (user: User): boolean => {
    return this.userPresentation.isNewUser(user);
  };

  readonly formatDate = (dateString: string): string => {
    return this.userPresentation.formatDate(dateString);
  };
}
