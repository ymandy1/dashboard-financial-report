import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  email: string = '';
  senha: string = '';

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Senha:', this.senha);

    const body = {
      "email": this.email,
      "password": this.senha
    }

    this.loginService.login(body).subscribe({
      next: (res: any) => {
        console.log("Autenticado!, token de autenticação:", res.token)
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        alert(`Erro no login: ${err}`)
        console.error('Erro no login:', err);
      }
    });
  }
}



