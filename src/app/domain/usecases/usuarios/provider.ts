import { Provider } from '@angular/core';
import { ObtenerUsuariosUseCase } from './obtener-usuarios/obtener-usuarios.usecase';
import { ObtenerUsuariosUseCaseImpl } from './obtener-usuarios/obtener-usuarios.usecase.impl';
import { ObtenerDetalleUsuarioUseCaseImpl } from './obtener-detalle-usuario/obtener-detalle-usuario.usecase.impl';
import { ObtenerDetalleUsuarioUseCase } from './obtener-detalle-usuario/obtener-detalle-usuario.usecase';

export const USERS_USECASES: Provider[] = [
  {
    provide: ObtenerUsuariosUseCase,
    useClass: ObtenerUsuariosUseCaseImpl,
  },
  {
    provide: ObtenerDetalleUsuarioUseCase,
    useClass: ObtenerDetalleUsuarioUseCaseImpl,
  },
];
