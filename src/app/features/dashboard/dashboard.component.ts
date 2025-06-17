import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DoacoesService } from './services/doacoes.service';
import { DoacaoDTO } from '../dashboard/model/doacao';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public config: any;
  chart: any;

  totalArrecadado: number = 0;
  percentArrecadado: number = 0;
  metaDoMes: number = 500;
  nome?: string;
  contato?: string;
  email?: string;
  role?: string;

  constructor(private doacoesService: DoacoesService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.nome = params['nome'];
    //   this.contato = params['contato'];
    //   this.email = params['email'];
    //   this.role = params['role'];

    //   localStorage.setItem('nome', params['nome']);
    //   localStorage.setItem('contato', params['contato']);
    //   localStorage.setItem('email', params['email']);
    //   localStorage.setItem('role', params['role']);

    // })
  }

  ngAfterViewInit(): void {
    this.setupDashboard();
  }

  private setupDashboard() {
    this.doacoesService.getDoacoes().subscribe({
      next: (data) => {
        this.config = this.configBuilder(data);

        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart('myChart', this.config);

        this.totalArrecadado = Array.isArray(data)
          ? data.reduce((acc, item) => acc + (item.total || 0), 0)
          : 0;
        this.percentArrecadado = Math.round((this.totalArrecadado / this.metaDoMes) * 100);
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
            label: 'Valor das doações em reais',
            data: values,
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


}