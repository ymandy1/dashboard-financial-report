import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParceirosService {

  constructor(private httpClient: HttpClient) { }

  addParceiro(parceiro: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/parceiro', parceiro, {
      responseType: 'text'
    });
  }

  getParceiro(): Observable<any[]> {
    return this.httpClient.get<any>('http://localhost:8080/api/parceiro');
  }

  deleteParceiro(id: number): Observable<any> {
    return this.httpClient.delete('http://localhost:8080/api/parceiro?idParceiro=' + id, {
      responseType: 'text'
    });
  }

  updateParceiro(id: number, parceiro: any): Observable<any> {
    return this.httpClient.put(`http://localhost:8080/api/parceiro/${id}`, parceiro);
  }

}
