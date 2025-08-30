import { Provider } from '@angular/core';
import { UsersRepository } from './users/users.repository';
import { UsersRepositoryImpl } from '@/data/repositories-impl/users/users.repository.impl';

export const REPOSITORIES: Provider[] = [
  {
    provide: UsersRepository,
    useClass: UsersRepositoryImpl,
  },
];
