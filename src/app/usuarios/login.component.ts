import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario'
import Swal from 'sweetalert2';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario
  titulo:string = "Inicio de sesion";

  constructor(private loginService: LoginService, private rutas: Router ) {
    this.usuario = new Usuario();

   }

  ngOnInit(): void {
  }

  login():void{

    console.log(this.usuario)

    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Porfavor rellena los campos!',
        footer: '<a href>Why do I have this issue?</a>'
      })
      return;

    }
    this.loginService.login(this.usuario).subscribe(response => {

      console.log(response);
      this.rutas.navigate(['/carros']);
      Swal.fire('Login', `Bienvenido ${response.username}, has iniciado sesion con exito`)

    })
  }
}
