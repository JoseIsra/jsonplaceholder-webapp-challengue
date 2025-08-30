import { PostModel } from '@/domain/models/posts/posts.response.model';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostStoreService {
  private _posts = signal<PostModel[]>([]);
  private _totalPosts = signal<PostModel[]>([]);

  get posts() {
    return this._posts();
  }

  get totalPosts() {
    return this._totalPosts();
  }

  addNewPost(post: PostModel) {
    this._posts.update((posts) => [post, ...posts]);
  }

  updatePost(post: PostModel) {
    this._posts.update((posts) =>
      posts.map((item) => (item.id === post.id ? post : item)),
    );
  }

  setPosts(posts: PostModel[]) {
    this._posts.set(posts);
  }

  setTotalPosts(posts: PostModel[]) {
    this._totalPosts.set(posts);
  }
}
