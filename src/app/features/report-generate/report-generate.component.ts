import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParceirosService } from '../config/services/parceiros.service';

@Component({
  standalone: true,
  selector: 'app-report-generate',
  imports: [FormsModule, CommonModule],
  templateUrl: './report-generate.component.html',
  styleUrls: ['./report-generate.component.css']
})
export class ReportGenerateComponent implements OnInit {

  parceiros: any[] = [];

  tipoRelatorio = '';
  dataInicio = '';
  dataFim = '';
  parceiro = '';

  constructor(private router: Router, private parceiroService: ParceirosService) { }

  ngOnInit(): void {
    this.parceiroService.getParceiro().subscribe({
      next: (res) => {
        this.parceiros = res;
        console.log(this.parceiros)
      },
      error: (err) => {
        console.error('Erro ao buscar parceiros:', err);
      }
    });
  }

  gerarRelatorio() {
    this.router.navigate(['/gerar-relatorio'], {
      queryParams: {
        anoMensal: "2024",
        tipo: this.tipoRelatorio,
        inicio: this.dataInicio,
        fim: this.dataFim,
        parceiro: this.parceiro
      }
    });
  }

}
