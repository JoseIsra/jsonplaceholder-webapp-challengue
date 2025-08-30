import { NoParam } from '@/domain/base/params/no-param.paylod';
import { Usecase } from '@/domain/base/usecase.contract';
import { PostModel } from '@/domain/models/posts/posts.response.model';

export abstract class ObtenerPostsUseCase extends Usecase<
  NoParam,
  PostModel[]
> {}
