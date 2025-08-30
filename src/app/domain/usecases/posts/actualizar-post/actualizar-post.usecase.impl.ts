import { Injectable } from '@angular/core';
import { ActualizarPostUseCase } from './actualizar-post.usecase';
import { PostsRepository } from '@/domain/repositories/posts/posts.repository';
import { catchError, Observable } from 'rxjs';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { UpdatePostRequestModel } from '@/domain/models/posts/posts.request.model';
import { Param } from '@/domain/base/params/param.payload';

@Injectable({ providedIn: 'root' })
export class ActualizarPostUseCaseImpl implements ActualizarPostUseCase {
  constructor(private repo: PostsRepository) {}

  execute(param: Param<UpdatePostRequestModel>): Observable<PostModel> {
    return this.repo.updatePost(param.payload).pipe(
      catchError(() => {
        throw new Error('Sucedió algo inesperado al editar el post');
      }),
    );
  }
}
