import { Param } from '@/domain/base/params/param.payload';
import { Usecase } from '@/domain/base/usecase.contract';
import { CreatePostRequestModel } from '@/domain/models/posts/posts.request.model';
import { PostModel } from '@/domain/models/posts/posts.response.model';

export abstract class CrearPostUseCase extends Usecase<
  Param<CreatePostRequestModel>,
  PostModel
> {}
