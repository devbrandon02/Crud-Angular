import { Component, OnInit } from '@angular/core';
import { Carros } from './carros';
import { CarrosService } from './carros.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html'
})
export class CarrosComponent implements OnInit {

  carro: Carros[];
  constructor(private carrosService: CarrosService, private rutas: Router, private http: HttpClient) { }

  ngOnInit(): void {

      this.carrosService.getCarros().subscribe(
      carros => this.carro = carros
    );
  }

  eliminar(carros: Carros):void{

    Swal.fire({
      title: 'Estas Seguro?',
      text: `Seguro que desea eliminar el carro con placa: ${carros.placa}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
  
        this.carrosService.delete(carros.id).subscribe(
          response => {
            this.carro = this.carro.filter(car => car != carros)
            Swal.fire(
              'Cliente Eliminado!',
              `${carros.placa} ah sido eliminado correctamente`,
              'success'
            )
  
  
          }
  
        )
        
      }
    })
  }
}
