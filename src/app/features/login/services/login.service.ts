import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  private apiUrl = 'http://localhost:8080/api/auth'; // ajuste para o seu back-end

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  }

  validateToken(): Observable<boolean> {
    const token = this.getToken();
    if (!token) return of(false);

    return this.httpClient.get<{ valid: boolean }>(`${this.apiUrl}/validate-token`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      map(response => response.valid),
      catchError(() => of(false))
    );
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return false
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  public login(body: any): Observable<any> {

    // localStorage.setItem('authToken', token);

    return this.httpClient.post('http://localhost:8080/api/login', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

}
