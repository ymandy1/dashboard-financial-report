import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ParceirosService } from './services/parceiros.service';
import { error } from 'console';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(private parceiroService: ParceirosService) { }

  parceiros: any[] = [];

  user = { nome: '', contato: '', email: '' };
  senhaAtual = '';
  novaSenha = '';
  repetirSenha = '';

  ngOnInit(): void {
    this.parceiroService.getParceiro().subscribe({
      next: (res: any[]) => {
        this.parceiros = res;
      },
      error: (err) => {
        console.error('Erro ao buscar parceiros', err);
      }
    });
  }

  onEdit() {
    // Seu código para editar perfil, se houver
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
        let parceiro = {
          nome: result.value.nome,
          tipo: result.value.tipo
        }
        this.parceiroService.addParceiro(parceiro).subscribe({
          next: (res: any) => {
            console.log(res)
            console.log("parceiro adicionado")
          },
          error: (error: any) => {
            console.error(error)
            console.log("erro ao adicionar parceiro")
          }
        })
        Swal.fire('Adicionado!', 'Parceiro adicionado com sucesso.', 'success');
        this.parceiroService.getParceiro().subscribe({
          next: (res: any[]) => {
            this.parceiros = res;
          },
          error: (err) => {
            console.error('Erro ao atualizar lista de parceiros', err);
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
    // Criar lista de nomes para escolher
    Swal.fire({
      title: 'Escolha o parceiro para editar',
      input: 'select',
      inputOptions: this.parceiros.reduce((acc: any, cur: any, i: any) => {
        acc[i] = `${cur.nome} (${cur.tipo})`;
        return acc;
      }, {} as { [key: number]: string }),
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
            this.parceiros[parceiroIndex] = editResult.value;
            this.parceiroService.updateParceiro(parceiro.id, this.parceiros[parceiroIndex]).subscribe({
              next: (res) => console.log(res.mensagem),
              error: (err) => console.error(err)
            });
            Swal.fire('Atualizado!', 'Parceiro atualizado com sucesso.', 'success');
            this.parceiroService.getParceiro().subscribe({
              next: (res: any[]) => {
                this.parceiros = res;
              },
              error: (err) => {
                console.error('Erro ao atualizar lista de parceiros', err);
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
      inputOptions: this.parceiros.reduce((acc: any, cur: any, i: any) => {
        acc[i] = `${cur.nome} (${cur.tipo})`;
        return acc;
      }, {} as { [key: number]: string }),
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
        const parceiroNome = this.parceiros[parceiroIndex].nome;
        Swal.fire({
          title: 'Confirma exclusão?',
          text: `Excluir parceiro ${parceiroNome}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#e74c3c',
          cancelButtonColor: '#295c47',
          confirmButtonText: 'Sim, excluir',
          cancelButtonText: 'Cancelar',
        }).then((confirmResult) => {
          if (confirmResult.isConfirmed) {
            const parceiroId = this.parceiros[parceiroIndex].id;

            this.parceiroService.deleteParceiro(parceiroId).subscribe({
              next: () => {
                console.log("sucesso")
              },
              error: (error) => {
                console.log("Erro ao deletar parceiro", error)
              }
            })
            Swal.fire('Excluído!', 'Parceiro excluído com sucesso.', 'success');
            this.parceiroService.getParceiro().subscribe({
              next: (res: any[]) => {
                this.parceiros = res;
              },
              error: (err) => {
                console.error('Erro ao atualizar lista de parceiros', err);
              }
            });
          }
        });
      }
    });
  }
}
