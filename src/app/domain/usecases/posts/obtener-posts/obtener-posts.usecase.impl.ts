import { Injectable } from '@angular/core';
import { ObtenerPostsUseCase } from './obtener-posts.usecase';
import { PostsRepository } from '@/domain/repositories/posts/posts.repository';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { UsersStoreService } from '@/presentation/features/dashboard/pages/usuarios/services/usersStore.service';
import { UsersRepository } from '@/domain/repositories/users/users.repository';
import { ObtenerUsuariosMapper } from '../../usuarios/obtener-usuarios/mapper';

@Injectable({ providedIn: 'root' })
export class ObtenerPostsUseCaseImpl implements ObtenerPostsUseCase {
  constructor(
    private repo: PostsRepository,
    private userStore: UsersStoreService,
    private userRepo: UsersRepository,
    private usersMapper: ObtenerUsuariosMapper,
  ) {}

  execute(): Observable<PostModel[]> {
    return this.userRepo.getAllUsers().pipe(
      tap((users) => {
        const _users = users.map(this.usersMapper.toDataDto);
        this.userStore.setTotalUsers(_users);
      }),
      catchError(() => of([])),
      switchMap(() => this.repo.getAllPosts()),
      catchError(() => {
        throw new Error('Sucedió algo inesperado al obtener los posts');
      }),
    );
  }
}
