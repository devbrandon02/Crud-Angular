import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarrosComponent } from './carros/carros.component';
import { FormularioComponent } from './carros/formulario.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './usuarios/login.component';

const rutas: Routes = [
{path: '', redirectTo: 'login' , pathMatch: 'full'},
{path: 'carros', component: CarrosComponent},
{path: 'carros/formulario', component: FormularioComponent},
{path: 'carros/formulario/:id', component: FormularioComponent},
{path: 'login', component: LoginComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    CarrosComponent,
    FormularioComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
