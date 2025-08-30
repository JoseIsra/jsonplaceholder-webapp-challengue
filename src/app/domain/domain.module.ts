import { ModuleWithProviders, NgModule } from '@angular/core';
import { REPOSITORIES } from './repositories';
import { USECASES } from './usecases';

@NgModule({})
export class DomainModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: DomainModule,
      providers: [...REPOSITORIES, ...USECASES],
    } as ModuleWithProviders<any>;
  }
}
