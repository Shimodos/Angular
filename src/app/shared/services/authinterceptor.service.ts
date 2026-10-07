import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PersistenceService } from './persistance.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private PersistenceService: PersistenceService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    {
      const token = this.PersistenceService.get('accessToken');
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Token ${token}`),
        });
        return next.handle(cloned);
      } else {
        return next.handle(req);
      }
    }
  }
}
