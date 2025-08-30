import {
  CreatePostRequestModel,
  UpdatePostRequestModel,
} from '@/domain/models/posts/posts.request.model';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { Observable } from 'rxjs';

export abstract class PostsRepository {
  abstract getAllPosts(): Observable<PostModel[]>;

  abstract createPost(input: CreatePostRequestModel): Observable<PostModel>;
  abstract updatePost(input: UpdatePostRequestModel): Observable<PostModel>;
}
