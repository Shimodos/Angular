import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthResponseInterface } from '../types/authRespons.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const apiUrl = environment.apiUrl + '/users '; // Use the apiUrl from the environment configuration
    return this.http.post<AuthResponseInterface>(apiUrl, data).pipe(map(this.getUser.bind(this)));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const apiUrl = environment.apiUrl + '/users/login';
    return this.http.post<AuthResponseInterface>(apiUrl, data).pipe(map(this.getUser.bind(this)));
  }
}
