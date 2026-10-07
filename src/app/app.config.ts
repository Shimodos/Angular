// import { authInterceptor } from './auth/services/auth.interceptor';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptorService } from './shared/services/authinterceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    importProvidersFrom(AuthModule),
    provideClientHydration(),
    importProvidersFrom(StoreModule.forRoot({})),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(EffectsModule.forRoot([])),
  ],
};
