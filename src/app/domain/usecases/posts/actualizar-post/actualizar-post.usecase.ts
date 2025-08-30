import { Param } from '@/domain/base/params/param.payload';
import { Usecase } from '@/domain/base/usecase.contract';
import { UpdatePostRequestModel } from '@/domain/models/posts/posts.request.model';
import { PostModel } from '@/domain/models/posts/posts.response.model';

export abstract class ActualizarPostUseCase extends Usecase<
  Param<UpdatePostRequestModel>,
  PostModel
> {}
