import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {

  }

  authenticateUser({username, password}) {
    return this.http.post('http://localhost:3000/auth/v1/', { username, password });
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this.http.post('http://localhost:3000/auth/v1/isAuthenticated', {}, {
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    })
    .map((res) => res['isAuthenticated'])
    .toPromise();

  }
}
