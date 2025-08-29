import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { NgMaterialModule } from './presentation/shared/externals/ng-material/ng-material.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import MyCustomPreset from './presentation/shared/externals/custom-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(NgMaterialModule.forRoot()),
    providePrimeNG({
      theme: {
        preset: MyCustomPreset,
        options: {
          darkModeSelector: 'none',
        },
      },
    }),
  ],
};
