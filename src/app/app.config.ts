import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthModule } from './auth/auth.module';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Подтягивает маршруты из AuthModule (RouterModule.forChild) в корневой роутер.
    importProvidersFrom(AuthModule),
    provideClientHydration(),
  ],
};
