import { UserDto } from '@/data/dtos/users/users.response.dto';
import { Param } from '@/domain/base/params/param.payload';
import { Usecase } from '@/domain/base/usecase.contract';
import { GetSingleUserRequestModel } from '@/domain/models/users/users.request.model';
import { UserModel } from '@/domain/models/users/users.response.model';

export abstract class ObtenerDetalleUsuarioUseCase extends Usecase<
  Param<GetSingleUserRequestModel>,
  UserModel
> {}
