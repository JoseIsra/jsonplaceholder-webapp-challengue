import { Provider } from '@angular/core';
import { ObtenerPostsUseCase } from './obtener-posts/obtener-posts.usecase';
import { ObtenerPostsUseCaseImpl } from './obtener-posts/obtener-posts.usecase.impl';
import { CrearPostUseCaseImpl } from './crear-post/crear-post.usecase.impl';
import { CrearPostUseCase } from './crear-post/crear-post.usecase';
import { ActualizarPostUseCaseImpl } from './actualizar-post/actualizar-post.usecase.impl';
import { ActualizarPostUseCase } from './actualizar-post/actualizar-post.usecase';

export const POSTS_USECASES: Provider[] = [
  {
    provide: ObtenerPostsUseCase,
    useClass: ObtenerPostsUseCaseImpl,
  },
  {
    provide: CrearPostUseCase,
    useClass: CrearPostUseCaseImpl,
  },
  {
    provide: ActualizarPostUseCase,
    useClass: ActualizarPostUseCaseImpl,
  },
];
