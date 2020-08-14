import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../modules/auth/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  register(user:User): Observable<any> {
    const endPoint = 'http://localhost:8084/api/v1/userservice/save';
    return this.http.post(endPoint, user);
  }

  login(user:User) 
  {
    const endPoint = 'http://localhost:8084/api/v1/userservice/login';
    return this.http.post(endPoint, user);
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
