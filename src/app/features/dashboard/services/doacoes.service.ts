import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoacaoDTO } from '../model/doacao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {

  constructor(private httpClient: HttpClient) { }

  public getDoacoes(): Observable<DoacaoDTO> {
    return this.httpClient.get<DoacaoDTO>('http://localhost:8080/api/doacoes');
  }

}
