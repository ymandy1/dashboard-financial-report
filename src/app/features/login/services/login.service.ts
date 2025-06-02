import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  public login(body: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/login', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

}
