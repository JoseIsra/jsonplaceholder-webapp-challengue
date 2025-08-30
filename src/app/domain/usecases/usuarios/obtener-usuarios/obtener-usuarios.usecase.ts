import { UserDto } from '@/data/dtos/users/users.response.dto';
import { NoParam } from '@/domain/base/params/no-param.paylod';
import { Usecase } from '@/domain/base/usecase.contract';

export abstract class ObtenerUsuariosUseCase extends Usecase<
  NoParam,
  UserDto[]
> {}
