import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResolveHook } from 'module';

export interface RelatorioFiltro {
  inicio: string;
  fim: string;
}

export interface RelatorioDados {
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

  getArrecadacaoMensal(filtro: any): Observable<RelatorioDados> {
    if (filtro.anoMensal) {
      const params = new HttpParams()
        .set('ano', filtro.anoMensal)

      return this.http.get<RelatorioDados>("http://localhost:8080/api/doacoes/relatorio/arrecadacao-mensal", { params })
    }

    const params = new HttpParams()
      .set('ano', "2025")

    return this.http.get<RelatorioDados>("http://localhost:8080/api/doacoes/relatorio/arrecadacao-mensal", { params })
  }

  getComOuSemParceiros(filtro: any): Observable<RelatorioDados> {
    const params = new HttpParams()
      .set('inicio', filtro.inicio)
      .set('fim', filtro.fim)
    return this.http.get<RelatorioDados>("http://localhost:8080/api/doacoes/relatorio/comparativo", { params })

  }
}
