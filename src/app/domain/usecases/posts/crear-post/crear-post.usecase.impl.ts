import { Injectable } from '@angular/core';
import { CrearPostUseCase } from './crear-post.usecase';
import { PostsRepository } from '@/domain/repositories/posts/posts.repository';
import { catchError, Observable } from 'rxjs';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { CreatePostRequestModel } from '@/domain/models/posts/posts.request.model';
import { Param } from '@/domain/base/params/param.payload';

@Injectable({ providedIn: 'root' })
export class CrearPostUseCaseImpl implements CrearPostUseCase {
  constructor(private repo: PostsRepository) {}

  execute(param: Param<CreatePostRequestModel>): Observable<PostModel> {
    return this.repo.createPost(param.payload).pipe(
      catchError(() => {
        throw new Error('Sucedió algo inesperado al crear el post');
      }),
    );
  }
}
