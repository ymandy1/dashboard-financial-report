import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import Swal from 'sweetalert2';

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
        const token = res.token;
        if (token) {
          localStorage.setItem('authToken', token);
          this.router.navigate(['/dashboard']);
        }
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        // (F12)
        console.error('Código do erro:', err.status);
        console.error('Detalhes:', err);
      
        // Erro 500 ou desconhecido
        const status = err.status || 'Erro desconhecido';
        const message = err.error?.message || 'Usuário não encontrado ou senha incorreta.';
      
        Swal.fire({
          title: `Erro ${status}`,
          text: message,
          icon: 'error',
          confirmButtonText: 'Tentar novamente',
          background: '#fff3f3',
          iconColor: '#e74c3c',
          confirmButtonColor: '#295c47',
          customClass: {
            popup: 'login-alert-popup',
            title: 'login-alert-title',
            confirmButton: 'login-alert-button'
          }
        });
        
      }      
    });
  }
}



