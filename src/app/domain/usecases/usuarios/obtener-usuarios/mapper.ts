import { Mapper } from '@/data/base/mapper.contract';
import { UserDto } from '@/data/dtos/users/users.response.dto';
import { UserModel } from '@/domain/models/users/users.response.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObtenerUsuariosMapper implements Mapper<UserDto, UserModel> {
  toDataDto(param: UserModel): UserDto {
    return {
      id: param.id,
      name: param.name,
      username: param.username,
      email: param.email,
      phone: param.phone,
    };
  }

  toDomainObject(param: UserDto): UserModel {
    return {
      id: param.id,
      name: param.name,
      username: param.username,
      email: param.email,
      phone: param.phone,
      website: '',
      company: {
        bs: '',
        catchPhrase: '',
        name: '',
      },
      address: {
        city: '',
        street: '',
        suite: '',
        zipcode: '',
        geo: {
          lat: '0',
          lng: '0',
        },
      },
    };
  }
}
