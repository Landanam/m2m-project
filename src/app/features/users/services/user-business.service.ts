import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserTableField,
  getUserFieldType,
} from '../models/user.model';
import { UserService } from './user.service';
import { SortingService } from '../../../shared/services/sorting.service';

@Injectable({
  providedIn: 'root',
})
export class UserBusinessService {
  private userService = inject(UserService);
  private sortingService = inject(SortingService);

  getUsers(): Observable<User[]> {
    return this.userService.getUsers();
  }

  updateUser(userId: string, updateData: UpdateUserRequest): Observable<User> {
    return this.userService.updateUser(userId, updateData);
  }

  createUpdateRequest(formValue: CreateUserRequest): UpdateUserRequest {
    return {
      firstName: formValue.firstName || '',
      lastName: formValue.lastName || '',
      username: formValue.username || '',
      password: formValue.password || '',
    };
  }

  processUserUpdate(user: User, formValue: CreateUserRequest): Observable<User> {
    const updateData = this.createUpdateRequest(formValue);
    return this.updateUser(user.id, updateData);
  }

  filterAndSortUsers(
    users: User[],
    searchTerm: string,
    field: UserTableField,
    direction: 'asc' | 'desc',
  ): User[] {
    let filtered = users;

    const search = searchTerm.toLowerCase().trim();
    if (search) {
      filtered = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search) ||
          user.lastName.toLowerCase().includes(search) ||
          user.username.toLowerCase().includes(search),
      );
    }

    const fieldType = getUserFieldType(field);
    return this.sortingService.sort(filtered, field, direction, fieldType);
  }

  updateUserInCollection(users: User[], updatedUser: User): User[] {
    return users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
  }
}
