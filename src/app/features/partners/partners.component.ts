import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partners',
  imports: [],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent {

  constructor(private router: Router) {

  }

  gerarRelatorio() {
    this.router.navigate(['/gerar-relatorio'], {
      queryParams: {
        tipo: this,
        inicio: this,
        fim: this,
        parceiro: this
      }
    });
  }
}
