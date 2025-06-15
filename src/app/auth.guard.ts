// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './features/login/services/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
