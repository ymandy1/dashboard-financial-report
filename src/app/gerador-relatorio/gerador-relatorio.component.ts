import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { BffRelatorioService } from './service/bff-relatorio.service';
Chart.register(...registerables);
@Component({
  selector: 'app-gerador-relatorio',
  templateUrl: './gerador-relatorio.component.html',
  styleUrls: ['./gerador-relatorio.component.css'],
  standalone: false
})
export class GeradorRelatorioComponent implements OnInit {
  tipo: string = '';
  inicio: string = '';
  fim: string = '';
  parceiro: string = '';
  relatorio: any;
  chart: any;
  public config: any;

  parceiroIds: Record<string, number> = {
    'Parceiro Tech': 1,
    'Parceiro Educa': 2,
    'Parceiro Saúde': 3,
    'Todos': 0
  };

  constructor(
    private route: ActivatedRoute,
    private relatorioService: BffRelatorioService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'];
      this.inicio = params['inicio'];
      this.fim = params['fim'];

      if (this.tipo === 'por-parceiro') {
        const idParceiro = this.parceiroIds[this.parceiro] ?? 0;

        this.relatorioService.getTotalPorParceiro({
          inicio: this.inicio,
          fim: this.fim,
        }).subscribe({
          next: (dados: any) => {
            this.relatorio = dados;
            this.setupDashboard(dados)
            console.log('Relatório recebido:', dados);
          },
          error: (err: any) => {
            console.error('Erro ao buscar relatório:', err);
          }
        });
      }
    });
  }

  private configBuilder(data: any): any {
    return {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Valor das doações',
            data: data.values,
            backgroundColor: 'green'
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
      },
    };
  }

  setupDashboard(dados: any) {
    const labels = dados.map((item: any) => item.nomeParceiro);
    const values = dados.map((item: any) => item.total);

    const chartData = {
      labels,
      values
    };

    this.config = this.configBuilder(chartData);
    this.chart = new Chart('myChart', this.config);
  }
}


