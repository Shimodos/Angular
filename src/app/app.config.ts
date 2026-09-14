import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { AuthModule } from './auth/auth.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Подтягивает маршруты из AuthModule (RouterModule.forChild) в корневой роутер.
    importProvidersFrom(AuthModule),
    provideClientHydration(),
    // StoreModule.forRoot, а не provideStore(): StoreModule.forFeature в AuthModule
    // требует StoreRootModule, а его регистрирует только forRoot.
    importProvidersFrom(StoreModule.forRoot({})),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
