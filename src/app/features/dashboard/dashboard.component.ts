import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DoacoesService } from './services/doacoes.service';

// Register all components in Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private doacoesService: DoacoesService) { }

  public config: any = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Sales',
          data: ['414', '32', '12', '45', '23', '56', '78'],
          backgroundColor: 'blue'
        },
        {
          label: 'PAT',
          data: ['12', '23', '45', '67', '89', '90', '100'],
          backgroundColor: 'red'
        },

      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      isResponsive: true,
      responsive: true,
    },
  };

  chart: any;

  ngOnInit(): void {
    this.setupDashboard();
    this.chart = new Chart('myChart', this.config);
  }

  private setupDashboard() {
    this.doacoesService.getDoacoes()
  }
}
