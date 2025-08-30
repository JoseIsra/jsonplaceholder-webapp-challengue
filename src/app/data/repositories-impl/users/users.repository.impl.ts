import { ApiManifest } from '@/data/constants/api-manifest';
import { GetSingleUserRequestModel } from '@/domain/models/users/users.request.model';
import { UserModel } from '@/domain/models/users/users.response.model';
import { UsersRepository } from '@/domain/repositories/users/users.repository';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersRepositoryImpl implements UsersRepository {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(ApiManifest.USERS_URL);
  }

  getSingleUser(params: GetSingleUserRequestModel): Observable<UserModel> {
    return this.http.get<UserModel>(`${ApiManifest.USERS_URL}/${params.id}`);
  }
}
