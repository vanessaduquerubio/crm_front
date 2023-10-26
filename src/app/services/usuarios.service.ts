import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { Proyecto } from '../interfaces/proyecto.interface';

import { UserProyecto } from '../interfaces/userProyecto.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  isLogged(): any {
    throw new Error('Method not implemented.');
  }
  private httpClient = inject(HttpClient)
  private baseUrl: string;

  router = inject(Router)
  constructor() {
    this.baseUrl = 'https://crm-back1.onrender.com/api/usuarios'
  };

  getAll(): Promise<Usuario[] | any> {
    return firstValueFrom(
      this.httpClient.get<Usuario[] | any>(this.baseUrl))
  };

  create(formValue: any): Promise<Usuario | any> {
    return firstValueFrom(
      this.httpClient.post<Usuario | any>(this.baseUrl, formValue)
    );
  };
  getById(usuarioId: number): Promise<Usuario | any> {
    return firstValueFrom(
      this.httpClient.get<Usuario | any>(`${this.baseUrl}/${usuarioId}`)
    );
  };
  update(usuarioId: number, formValue: any): Promise<Usuario | any> {
    return firstValueFrom(
      this.httpClient.put<Usuario | any>(`${this.baseUrl}/editar/${usuarioId}`, formValue)
    );
  };

  updateUsuario(usuarioId: number, formValue: any): Promise<Usuario | any> {
    return firstValueFrom(
      this.httpClient.put<Usuario | any>(`${this.baseUrl}/editar/user/${usuarioId}`, formValue)
    );
  }
  deleteUser(usuarioId: number): Promise<Usuario | any> {
    return firstValueFrom(
      this.httpClient.delete<Usuario | any>(`${this.baseUrl}/${usuarioId}`)
    );
  };

  getProyectos(usuarioId: number, fecha: Date): Promise<Proyecto | any> {
    return firstValueFrom(
      this.httpClient.get<Proyecto | any>(`${this.baseUrl}/${usuarioId}/${fecha}`)
    );
  }

  getLoginUser(formValue: any): Promise<Usuario | any> {
    return firstValueFrom(
      this.httpClient.post<Usuario | any>(`${this.baseUrl}/login/user`, formValue)
    );
  }
  getByprofile(): Promise<Usuario | any> {
    return firstValueFrom(
      this.httpClient.get<Usuario | any>(`${this.baseUrl}/profile`)
    );
  };
  getRegistroHour({ proyectos_id, hora_entrada, hora_salida, fecha }: any): Promise<UserProyecto | any> {
    return firstValueFrom(
      this.httpClient.post<UserProyecto | any>(`${this.baseUrl}/profile/horasdedicadas`, { proyectos_id, hora_entrada, hora_salida, fecha })
    )
  }

  isLoggedUser(): boolean {
    return localStorage.getItem('user_token') ? true : false

  }
  getWeek(usuarios_Id: number, fecha_inicio: any, fecha_fin: any): any {
    const body = {
      "usuarios_id": usuarios_Id,
      "fecha_inicio": fecha_inicio,
      "fecha_fin": fecha_fin
    }
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/getWeek`, body)
    )
  }

  getSumHora(usuarios_Id: number, fecha: any): any {
    const body = {
      "usuarios_Id": usuarios_Id,
      "fecha": fecha
    }

    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/getTime`, body)
    )
  }


  loginInicioUser(): boolean {
    return localStorage.getItem('user_token') ? false : true
  }
  isHomePage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl === '/usuarios/perfil';
  }

}



