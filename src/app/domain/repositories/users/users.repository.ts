import { GetSingleUserRequestModel } from '@/domain/models/users/users.request.model';
import { UserModel } from '@/domain/models/users/users.response.model';
import { Observable } from 'rxjs';

export abstract class UsersRepository {
  abstract getAllUsers(): Observable<UserModel[]>;

  abstract getSingleUser(
    params: GetSingleUserRequestModel,
  ): Observable<UserModel>;
}
