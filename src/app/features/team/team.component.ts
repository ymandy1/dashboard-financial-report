import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../login/services/login.service';

interface Funcionario {
  nome: string;
  email: string;
  contato?: string;
  role: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {
  rolesDisponiveis = [
    { value: 'MASTER', label: 'Administrador (MASTER)' },
    { value: 'ADMIN', label: 'Gestor (ADMIN)' },
    { value: 'USER', label: 'Usuário (USER)' }
  ];
  funcionarios: Funcionario[] = [];
  novoFuncionario: Funcionario = { nome: '', email: '', role: '' };
  indiceEditando: number | null = null;
  userRole: string | null = null;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.loginService.getUsuarios().subscribe({
      next: (res: any) => {
        this.funcionarios = res;
      },
      error: (err: any) => {
        console.error('Erro ao carregar usuários', err);
      }
    });
  }

  adicionarFuncionario() {
    if (!this.novoFuncionario.nome || !this.novoFuncionario.email || !this.novoFuncionario.role) return;

    const body = {
      nome: this.novoFuncionario.nome,
      email: this.novoFuncionario.email,
      contato: '00000000000',
      password: '123456',
      role: this.novoFuncionario.role
    };

    if (this.indiceEditando !== null) {
      const emailAntigo = this.funcionarios[this.indiceEditando].email;
      this.loginService.updateUsuario(emailAntigo, body).subscribe({
        next: () => {
          Swal.fire('Atualizado!', 'Funcionário atualizado com sucesso.', 'success');
          this.carregarFuncionarios();
          this.indiceEditando = null;
          this.novoFuncionario = { nome: '', email: '', role: '' };
        },
        error: (err: any) => {
          Swal.fire('Erro', 'Erro ao atualizar usuário.', 'error');
          console.error(err);
        }
      });
    } else {
      this.loginService.addUsuario(body).subscribe({
        next: () => {
          Swal.fire('Adicionado!', 'Funcionário adicionado com sucesso.', 'success');
          this.carregarFuncionarios();
          this.novoFuncionario = { nome: '', email: '', role: '' };
        },
        error: (err: any) => {
          Swal.fire('Erro', 'Erro ao adicionar usuário.', 'error');
          console.error(err);
        }
      });
    }
  }

  removerFuncionario(index: number) {
    const email = this.funcionarios[index].email;
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você está prestes a excluir este funcionário.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.loginService.deleteUsuario(email).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'Funcionário foi removido.', 'success');
            this.carregarFuncionarios();
          },
          error: (err: any) => {
            Swal.fire('Erro', 'Erro ao excluir funcionário.', 'error');
            console.error(err);
          }
        });
      }
    });
  }

  editarFuncionario(index: number) {
    this.indiceEditando = index;
    const { nome, email, role } = this.funcionarios[index];
    this.novoFuncionario = { nome, email, role };
  }
}
