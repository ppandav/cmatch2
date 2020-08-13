import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    const endPoint = 'http://localhost:8085/api/v1/Matchservice/register';
    return this.http.post(endPoint, user);
  }

  login(user: { username: string; password: string }) {
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
