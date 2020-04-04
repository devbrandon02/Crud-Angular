import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Carros } from './carros';
import { CarrosService } from './carros.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  public titulo: string = 'Crear Carros'
  public carro: Carros = new Carros();

  constructor(private carrosService: CarrosService, private activarRutas: ActivatedRoute, private rutas: Router) { }

  ngOnInit(): void {
    this.cargarCarros();
  }

  cargarCarros():void{

   this.activarRutas.params.subscribe(params =>{

    let id = params['id']

    if(id){
      this.carrosService.getCarro(id).subscribe((carro) => this.carro = carro)

    }
   })
  }

  crearCarros():void{

    this.carrosService.crear(this.carro).subscribe(carros =>{
      this.rutas.navigate(['/carros']);

      Swal.fire(
        'Nuevo Carro!',
        `El carro con placa ${carros.placa} Se registro Correctamente`,
        'success'
      )

    })

  }

  actualizarCarros():void{
    this.carrosService.update(this.carro)
    .subscribe(carros =>{
      this.rutas.navigate(['/carros']);

      Swal.fire(
        'Carro actualizado!',
        `Carro con placa ${carros.placa} actualizado correctamente`,
        'success'
      )

    })


  }

}
