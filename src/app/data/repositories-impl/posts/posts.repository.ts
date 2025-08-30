import { ApiManifest } from '@/data/constants/api-manifest';
import {
  CreatePostRequestModel,
  UpdatePostRequestModel,
} from '@/domain/models/posts/posts.request.model';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { PostsRepository } from '@/domain/repositories/posts/posts.repository';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsRepositoryImpl implements PostsRepository {
  constructor(private http: HttpClient) {}

  createPost(input: CreatePostRequestModel): Observable<PostModel> {
    return this.http.post<PostModel>(ApiManifest.POSTS_URL, input);
  }

  getAllPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(ApiManifest.POSTS_URL);
  }

  updatePost(input: UpdatePostRequestModel): Observable<PostModel> {
    return this.http.put<PostModel>(
      `${ApiManifest.POSTS_URL}/${input.id}`,
      input,
    );
  }
}
