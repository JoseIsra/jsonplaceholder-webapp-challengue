import { Provider } from '@angular/core';
import { UsersRepository } from './users/users.repository';
import { UsersRepositoryImpl } from '@/data/repositories-impl/users/users.repository.impl';
import { PostsRepository } from './posts/posts.repository';
import { PostsRepositoryImpl } from '@/data/repositories-impl/posts/posts.repository';

export const REPOSITORIES: Provider[] = [
  {
    provide: UsersRepository,
    useClass: UsersRepositoryImpl,
  },
  {
    provide: PostsRepository,
    useClass: PostsRepositoryImpl,
  },
];
