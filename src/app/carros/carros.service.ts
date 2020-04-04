import { Injectable } from '@angular/core';
import { Carros } from './carros';
import { of,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../usuarios/login.service';



@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  private urlEndPoint = 'http://localhost:8080/api/carros';
  private httpHeaders = new HttpHeaders({'content-Type':'application/json'})

  constructor(private http: HttpClient, private rutas: Router, private loginservice: LoginService) { }

  private agregarAuthorizationHeader(){

    let token = this.loginservice.token;

    if(token != null){
      
       return this.httpHeaders.append('Authorization', 'Bearer' + token);
    
    }

    return this.httpHeaders;


  }

private isNoAutorizado(e):boolean{

  if(e.status == 401 || e.status== 403){
    this.rutas.navigate['/login']
    return true;

  }

  return false;

}
  delete(id: number): Observable<Carros>{

    return this.http.delete<Carros>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()});
  }

  crear(carro: Carros): Observable<Carros>{


    return this.http.post<Carros>(this.urlEndPoint, carro, {headers: this.agregarAuthorizationHeader()});
  }

  getCarros(): Observable<Carros[]>{

    return this.http.get<Carros[]>(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()});
  }

  getCarro(id): Observable<Carros>{


    return this.http.get<Carros>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()});
  }

  update(carro: Carros): Observable<Carros>{

    return this.http.put<Carros>(`${this.urlEndPoint}/${carro.id}`, carro, {headers: this.agregarAuthorizationHeader()})
  }
}
