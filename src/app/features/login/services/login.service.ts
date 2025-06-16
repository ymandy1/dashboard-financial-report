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

  private apiUrl = 'http://localhost:8081/api'; // base da API
  private authUrl = `${this.apiUrl}/auth`;

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      'Content-Type': 'application/json'
    });
  }

  validateToken(): Observable<boolean> {
    const token = this.getToken();
    if (!token) return of(false);

    return this.httpClient.get<{ valid: boolean }>(`${this.authUrl}/validate-token`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.valid),
      catchError(() => of(false))
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('contato');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  public login(body: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // === CRUD de Usuários ===

  getUsuarios(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/usuarios`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteUsuario(email: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/usuarios/${email}`, {
      headers: this.getAuthHeaders()
    });
  }

  addUsuario(user: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/cadastro`, user, {
      headers: this.getAuthHeaders()
    });
  }

  updateUsuario(email: string, user: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/usuarios/${email}`, user, {
      headers: this.getAuthHeaders()
    });
  }
}
