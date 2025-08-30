import { Injectable } from '@angular/core';
import { ObtenerUsuariosUseCase } from './obtener-usuarios.usecase';
import { UserDto } from '@/data/dtos/users/users.response.dto';
import { catchError, map, Observable } from 'rxjs';
import { UsersRepository } from '@/domain/repositories/users/users.repository';
import { ObtenerUsuariosMapper } from './mapper';

@Injectable({ providedIn: 'root' })
export class ObtenerUsuariosUseCaseImpl implements ObtenerUsuariosUseCase {
  constructor(
    private mapper: ObtenerUsuariosMapper,
    private repo: UsersRepository,
  ) {}

  execute(): Observable<UserDto[]> {
    return this.repo.getAllUsers().pipe(
      map((users) => users.map(this.mapper.toDataDto)),
      catchError(() => {
        throw new Error('Sucedió algo inesperado al cargar los usuarios');
      }),
    );
  }
}
