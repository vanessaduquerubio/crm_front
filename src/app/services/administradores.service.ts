import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Administrador } from '../interfaces/administrador.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  private httpServicio = inject(HttpClient)
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://crm-back1.onrender.com/api/admins'
  }

  getRegistro(contenido: any): Promise<Administrador> {
    return firstValueFrom(
      this.httpServicio.post<Administrador>(`${this.baseUrl}/registro`, contenido)
    )
  }

  getLogin(contenido: any): Promise<any> {
    return firstValueFrom(
      this.httpServicio.post<any>(`${this.baseUrl}/login`, contenido)
    )
  }

  isLogged(): boolean {
    return localStorage.getItem('admins_token') ? true : false
  }
  getByprofile(): Promise<Administrador | any> {
    return firstValueFrom(
      this.httpServicio.get<Administrador | any>(`${this.baseUrl}/profile`)
    );
  };



  loginInicio(): boolean {
    return localStorage.getItem('admins_token') ? false : true
  }
}