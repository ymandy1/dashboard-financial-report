import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config',
  standalone: true, 
  imports: [FormsModule],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  user = { nome: '', contato: '', email: '' };
  senhaAtual = '';
  novaSenha = '';
  repetirSenha = '';

  onEdit() {
  }

  confirmDelete() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação irá excluir sua conta permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#295c47',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAccount();
      }
    });
  }

  deleteAccount() {
    Swal.fire('Deletado!', 'Sua conta foi excluída.', 'success');
  }
}
