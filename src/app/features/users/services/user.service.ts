import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User, CreateUserRequest, UpdateUserRequest } from '../models/user.model';
import { API_CONFIG } from '../../../core/config/api.config';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpService = inject(HttpService);
  private readonly apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.users}`;

  getUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.httpService.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(userData: CreateUserRequest): Observable<User> {
    return this.httpService.post<User>(this.apiUrl, userData);
  }

  updateUser(id: string, userData: UpdateUserRequest): Observable<User> {
    return this.httpService.put<User>(`${this.apiUrl}/${id}`, userData);
  }

  deleteUser(id: string): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}/${id}`);
  }
}
