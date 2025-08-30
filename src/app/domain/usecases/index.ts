import { Provider } from '@angular/core';
import { USERS_USECASES } from './usuarios/provider';
import { POSTS_USECASES } from './posts/provider';

export const USECASES: Provider[] = [...USERS_USECASES, ...POSTS_USECASES];
