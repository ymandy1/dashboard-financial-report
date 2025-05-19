import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DoacoesService } from './services/doacoes.service';
import { DoacaoDTO } from '../dashboard/model/doacao';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private doacoesService: DoacoesService) { }

  public config: any;

  chart: any;

  ngOnInit(): void {
    this.setupDashboard();
  }


  private setupDashboard() {
    this.doacoesService.getDoacoes().subscribe({
      next: (data) => {
        this.config = this.configBuilder(data);
        this.chart = new Chart('myChart', this.config);
      },
      error: (err) => {
        console.error('Erro ao buscar dados do dashboard', err);
      }
    });
  }

  private configBuilder(data: any[]): any {
    const labels = data.map(item => `Mês ${item.mes}`);
    const values = data.map(item => item.total);

    return {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Valor das doações',
            data: values,
            backgroundColor: 'blue'
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


}
