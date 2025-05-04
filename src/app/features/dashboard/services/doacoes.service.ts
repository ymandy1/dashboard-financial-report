import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoacaoDTO } from '../model/doacaoDTO';

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {

  chartLabels: string[] = [];
  chartData: number[] = [];

  constructor(private httpClient: HttpClient) { }

  public getDoacoes(): any {
    this.httpClient.get<DoacaoDTO>('http://localhost:3000/api/dados').subscribe(data => {
      this.chartLabels = data.labels;
      this.chartData = data.values;
    })
  }

}
