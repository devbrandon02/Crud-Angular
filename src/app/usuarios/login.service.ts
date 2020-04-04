import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient,) { }

  public get usuario(): Usuario{

    if(this._usuario != null){

      return this._usuario;
    } else if(this._usuario == null && sessionStorage.getItem('usuario') != null){

      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario
    }

    return new Usuario();
  }

  public get token(): string{
    if(this._token != null){

      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token') != null){

      this._token = sessionStorage.getItem('token')
      return this._token
    }

    return null;
  }

  login(usuario:Usuario):Observable<any>{
    
    const credenciales = btoa('zabud' + ':' + '123');
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization' : 'Basic ' + credenciales});
    let params  = new URLSearchParams();

    params.set('grant_type','password');
    params.set('username', usuario.username);
    params.set('password', usuario.password)
    console.log(params.toString())
    return this.http.post<any>(urlEndpoint, params.toString(), {headers:  httpHeaders }) 
  }

  guardarUsuario(accessToken: string):void{
    

    let payload = this.ObtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.username = payload.user_name;
    
    sessionStorage.setItem('Usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string):void{
    this._token=accessToken;
    sessionStorage.setItem('token', accessToken);

  }

  ObtenerDatosToken(accessToken:string):any{
    if(accessToken != null){

      return JSON.parse(atob(accessToken.split(".")[1]));

    }
    return null;

  }

  Autenticado():boolean{
    let payload = this.ObtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }

    return false;

  }
}
