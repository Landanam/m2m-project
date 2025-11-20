import { Component, signal, inject, DestroyRef, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { User, UserTableField } from '../../models/user.model';

import { UserEditComponent } from '../edit/user-edit';
import { UserListComponent } from '../user-list/user-list';
import { UserSearchComponent } from '../user-search/user-search';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination';

import { LoggerService } from '../../../../core/services/logger.service';
import { UserBusinessService } from '../../services/user-business.service';

@Component({
  selector: 'app-user-management',
  imports: [
    CommonModule,
    UserEditComponent,
    UserSearchComponent,
    UserListComponent,
    PaginationComponent,
  ],

  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagementComponent implements OnInit {
  private readonly config = {
    defaultSortField: 'id' as UserTableField,
    defaultSortDirection: 'asc' as const,
  };

  private destroyRef = inject(DestroyRef);
  private userBusinessService = inject(UserBusinessService);

  private logger = inject(LoggerService);

  users = signal<User[]>([]);
  loading = signal(false);
  showModal = signal(false);
  selectedUser = signal<User | null>(null);
  searchTerm = signal('');
  sortField = signal<UserTableField>(this.config.defaultSortField);
  sortDirection = signal<'asc' | 'desc'>(this.config.defaultSortDirection);
  paginatedUsers = signal<User[]>([]);

  filteredAndSortedUsers = computed(() => {
    return this.userBusinessService.filterAndSortUsers(
      this.users(),
      this.searchTerm(),
      this.sortField(),
      this.sortDirection(),
    );
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  onSearch(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
  }

  onSortChange(sortEvent: { field: UserTableField; direction: 'asc' | 'desc' }): void {
    this.sortField.set(sortEvent.field);
    this.sortDirection.set(sortEvent.direction);
  }

  onPageChange(paginatedData: User[]): void {
    this.paginatedUsers.set(paginatedData);
  }

  onUserSelect(user: User): void {
    this.selectedUser.set(user);
    this.showModal.set(true);
  }

  onCloseModal(): void {
    this.showModal.set(false);
    this.selectedUser.set(null);
  }

  onUserUpdated(updatedUser: User): void {
    this.users.update((users) =>
      this.userBusinessService.updateUserInCollection(users, updatedUser),
    );
  }

  private loadUsers(): void {
    this.loading.set(true);
    this.userBusinessService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users: User[]) => {
          this.users.set(users);
          this.loading.set(false);
        },
        error: (error: unknown) => {
          this.logger.error('Failed to load users', error);
          this.loading.set(false);
        },
      });
  }
}
