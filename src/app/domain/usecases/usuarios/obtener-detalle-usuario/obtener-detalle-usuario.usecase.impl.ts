import { Injectable } from '@angular/core';
import { ObtenerDetalleUsuarioUseCase } from './obtener-detalle-usuario.usecase';
import { catchError, Observable } from 'rxjs';
import { UsersRepository } from '@/domain/repositories/users/users.repository';
import { Param } from '@/domain/base/params/param.payload';
import { GetSingleUserRequestModel } from '@/domain/models/users/users.request.model';
import { UserModel } from '@/domain/models/users/users.response.model';

@Injectable({ providedIn: 'root' })
export class ObtenerDetalleUsuarioUseCaseImpl
  implements ObtenerDetalleUsuarioUseCase
{
  constructor(private repo: UsersRepository) {}

  execute(param: Param<GetSingleUserRequestModel>): Observable<UserModel> {
    return this.repo.getSingleUser(param.payload).pipe(
      catchError(() => {
        throw new Error(
          'Sucedió algo inesperado al cargar el detalle del usuario',
        );
      }),
    );
  }
}
