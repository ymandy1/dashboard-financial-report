import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RelatorioFiltro {
  inicio: string;      // yyyy-MM-dd
  fim: string;         // yyyy-MM-dd
}

export interface RelatorioDados {
  // Defina de acordo com a resposta da API
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class BffRelatorioService {
  private baseUrl = 'http://localhost:8080/api/doacoes/total-por-parceiro';

  constructor(private http: HttpClient) { }

  getTotalPorParceiro(filtro: RelatorioFiltro): Observable<RelatorioDados> {
    const params = new HttpParams()
      .set('inicio', filtro.inicio)
      .set('fim', filtro.fim)

    return this.http.get<RelatorioDados>(this.baseUrl, { params });
  }
}
