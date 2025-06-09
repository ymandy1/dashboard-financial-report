import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 

interface Funcionario {
  nome: string;
  email: string;
  permissao: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  funcionarios: Funcionario[] = [
    { nome: 'ANNA KATRINA', email: 'ANNA.KATRINA@EMAIL.COM', permissao: 'LEITURA' },
    { nome: 'BRUNO FERNANDES', email: 'BRUNO.FERNANDES@EMAIL.COM', permissao: 'LEITURA, EXECUÇÃO' },
    { nome: 'CAMILA OLIVEIRA', email: 'CAMILA.OLIVEIRA@EMAIL.COM', permissao: 'LEITURA, EXECUÇÃO, ESCRITA' },
    { nome: 'DANIEL SOUZA', email: 'DANIEL.SOUZA@EMAIL.COM', permissao: 'LEITURA, EXECUÇÃO, ESCRITA' },
    { nome: 'EDUARDO LIMA', email: 'EDUARDO.LIMA@EMAIL.COM', permissao: 'LEITURA' },
    { nome: 'FERNANDA RIBEIRO', email: 'FERNANDA.RIBEIRO@EMAIL.COM', permissao: 'LEITURA, EXECUÇÃO' },
    { nome: 'GABRIEL SANTOS', email: 'GABRIEL.SANTOS@EMAIL.COM', permissao: 'LEITURA' },
    { nome: 'HELENA COSTA', email: 'HELENA.COSTA@EMAIL.COM', permissao: 'LEITURA, EXECUÇÃO, ESCRITA' }
  ];

  novoFuncionario: Funcionario = { nome: '', email: '', permissao: '' };
  indiceEditando: number | null = null;

  adicionarFuncionario() {
    if (this.novoFuncionario.nome && this.novoFuncionario.email && this.novoFuncionario.permissao) {
      if (this.indiceEditando !== null) {
        this.funcionarios[this.indiceEditando] = { ...this.novoFuncionario };
        this.indiceEditando = null;
        Swal.fire({
          icon: 'success',
          title: 'Funcionário atualizado!',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        this.funcionarios.push({ ...this.novoFuncionario });
        Swal.fire({
          icon: 'success',
          title: 'Funcionário adicionado!',
          timer: 1500,
          showConfirmButton: false,
        });
      }

      this.novoFuncionario = { nome: '', email: '', permissao: '' };
    }
  }

  removerFuncionario(index: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você está prestes a excluir este funcionário.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionarios.splice(index, 1);
        Swal.fire({
          icon: 'success',
          title: 'Funcionário excluído!',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }

  editarFuncionario(index: number) {
    this.indiceEditando = index;
    this.novoFuncionario = { ...this.funcionarios[index] };
  }
}
