import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParceirosService } from '../config/services/parceiros.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-partners',
  imports: [FormsModule, CommonModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  parceiros: any[] = [];

  constructor(private router: Router, private parceiroService: ParceirosService) { }

  ngOnInit(): void {
    this.atualizarListaParceiros();
  }

  atualizarListaParceiros() {
    this.parceiroService.getParceiro().subscribe({
      next: (res: any[]) => {
        this.parceiros = res;
      },
      error: (err) => {
        console.error('Erro ao buscar parceiros', err);
      }
    });
  }

  adicionarParceiro() {
    Swal.fire({
      title: 'Adicionar Parceiro',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nome do parceiro">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Tipo do parceiro">`,
      focusConfirm: false,
      preConfirm: () => {
        const nome = (document.getElementById('swal-input1') as HTMLInputElement).value.trim();
        const tipo = (document.getElementById('swal-input2') as HTMLInputElement).value.trim();
        if (!nome || !tipo) {
          Swal.showValidationMessage('Por favor, preencha todos os campos');
          return;
        }
        return { nome, tipo };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const parceiro = {
          nome: result.value.nome,
          tipo: result.value.tipo
        };
        this.parceiroService.addParceiro(parceiro).subscribe({
          next: () => {
            Swal.fire('Adicionado!', 'Parceiro adicionado com sucesso.', 'success');
            this.atualizarListaParceiros();
          },
          error: (error: any) => {
            console.error(error);
            Swal.fire('Erro', 'Erro ao adicionar parceiro.', 'error');
          }
        });
      }
    });
  }

  editarParceiro() {
    if (this.parceiros.length === 0) {
      Swal.fire('Nenhum parceiro', 'Não há parceiros para editar.', 'info');
      return;
    }

    Swal.fire({
      title: 'Escolha o parceiro para editar',
      input: 'select',
      inputOptions: this.parceiros.reduce((acc: any, cur: any, i: number) => {
        acc[i] = `${cur.nome} (${cur.tipo})`;
        return acc;
      }, {}),
      inputPlaceholder: 'Selecione um parceiro',
      showCancelButton: true,
      preConfirm: (index) => {
        if (index === null) {
          Swal.showValidationMessage('Você precisa escolher um parceiro');
        }
        return index;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value !== null) {
        const parceiroIndex = Number(result.value);
        const parceiro = this.parceiros[parceiroIndex];

        Swal.fire({
          title: 'Editar Parceiro',
          html:
            `<input id="swal-input1" class="swal2-input" placeholder="Nome do parceiro" value="${parceiro.nome}">` +
            `<input id="swal-input2" class="swal2-input" placeholder="Tipo do parceiro" value="${parceiro.tipo}">`,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Salvar',
          cancelButtonText: 'Cancelar',
          preConfirm: () => {
            const nome = (document.getElementById('swal-input1') as HTMLInputElement).value.trim();
            const tipo = (document.getElementById('swal-input2') as HTMLInputElement).value.trim();
            if (!nome || !tipo) {
              Swal.showValidationMessage('Por favor, preencha todos os campos');
              return;
            }
            return { nome, tipo };
          }
        }).then((editResult) => {
          if (editResult.isConfirmed && editResult.value) {
            const parceiroEditado = editResult.value;
            this.parceiroService.updateParceiro(parceiro.id, parceiroEditado).subscribe({
              next: () => {
                Swal.fire('Atualizado!', 'Parceiro atualizado com sucesso.', 'success');
                this.atualizarListaParceiros();
              },
              error: (err) => {
                console.error(err);
                Swal.fire('Erro', 'Erro ao atualizar parceiro.', 'error');
              }
            });
          }
        });
      }
    });
  }

  excluirParceiro() {
    if (this.parceiros.length === 0) {
      Swal.fire('Nenhum parceiro', 'Não há parceiros para excluir.', 'info');
      return;
    }

    Swal.fire({
      title: 'Escolha o parceiro para excluir',
      input: 'select',
      inputOptions: this.parceiros.reduce((acc: any, cur: any, i: number) => {
        acc[i] = `${cur.nome} (${cur.tipo})`;
        return acc;
      }, {}),
      inputPlaceholder: 'Selecione um parceiro',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#295c47',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      preConfirm: (index) => {
        if (index === null) {
          Swal.showValidationMessage('Você precisa escolher um parceiro');
        }
        return index;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value !== null) {
        const parceiroIndex = Number(result.value);
        const parceiroId = this.parceiros[parceiroIndex].id;

        Swal.fire({
          title: 'Confirma exclusão?',
          text: `Excluir parceiro ${this.parceiros[parceiroIndex].nome}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#e74c3c',
          cancelButtonColor: '#295c47',
          confirmButtonText: 'Sim, excluir',
          cancelButtonText: 'Cancelar',
        }).then((confirmResult) => {
          if (confirmResult.isConfirmed) {
            this.parceiroService.deleteParceiro(parceiroId).subscribe({
              next: () => {
                Swal.fire('Excluído!', 'Parceiro excluído com sucesso.', 'success');
                this.atualizarListaParceiros();
              },
              error: (error) => {
                console.error('Erro ao deletar parceiro', error);
                Swal.fire('Erro', 'Erro ao excluir parceiro.', 'error');
              }
            });
          }
        });
      }
    });
  }
}
