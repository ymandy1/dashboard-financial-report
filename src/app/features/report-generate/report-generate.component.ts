import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-generate',
  imports: [FormsModule],
  templateUrl: './report-generate.component.html',
  styleUrl: './report-generate.component.css'
})
export class ReportGenerateComponent {

  tipoRelatorio = '';
  dataInicio = '';
  dataFim = '';
  parceiro = '';

  constructor(private router: Router) { }

  gerarRelatorio() {
    this.router.navigate(['/gerar-relatorio'], {
      queryParams: {
        tipo: this.tipoRelatorio,
        inicio: this.dataInicio,
        fim: this.dataFim,
        parceiro: this.parceiro
      }
    });
  }

}
