import { UserDto } from '@/data/dtos/users/users.response.dto';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersStoreService {
  private _users = signal<UserDto[]>([]);
  private _totalUsers = signal<UserDto[]>([]);

  get users() {
    return this._users();
  }

  get totalUsers() {
    return this._totalUsers();
  }

  setUsers(users: UserDto[]) {
    this._users.set(users);
  }

  setTotalUsers(users: UserDto[]) {
    this._totalUsers.set(users);
  }
}
