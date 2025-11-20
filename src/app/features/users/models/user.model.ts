export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  password: string;
  lastOnline: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
}

export type UserTableField = 'id' | 'firstName' | 'lastName' | 'createdAt';

export function getUserFieldType(field: UserTableField): 'number' | 'string' | 'date' {
  if (field === 'id') return 'number';
  if (field === 'createdAt') return 'date';
  return 'string';
}
