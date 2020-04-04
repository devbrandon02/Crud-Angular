import { Injectable } from '@angular/core';
import { Carros } from './carros';
import { of,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  private urlEndPoint = 'http://localhost:8080/api/carros';
  private httpHeaders = new HttpHeaders({'content-Type':'application/json'})

  constructor(private http: HttpClient, private rutas: Router) { }

private isNoAutorizado(e):boolean{

  if(e.status == 401 || e.status== 403){
    this.rutas.navigate['/login']
    return true;

  }

  return false;

}
  delete(id: number): Observable<Carros>{

    return this.http.delete<Carros>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

  crear(carro: Carros): Observable<Carros>{


    return this.http.post<Carros>(this.urlEndPoint, carro, {headers: this.httpHeaders});
  }

  getCarros(): Observable<Carros[]>{

    return this.http.get<Carros[]>(this.urlEndPoint);
  }

  getCarro(id): Observable<Carros>{


    return this.http.get<Carros>(`${this.urlEndPoint}/${id}`);
  }

  update(carro: Carros): Observable<Carros>{

    return this.http.put<Carros>(`${this.urlEndPoint}/${carro.id}`, carro, {headers: this.httpHeaders})
  }
}
