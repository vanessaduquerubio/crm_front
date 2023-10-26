import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../interfaces/proyecto.interface';
import { firstValueFrom } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private httpClient = inject(HttpClient)
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://crm-back1.onrender.com/api/proyectos'
  }
  getById(proyectoId: number): Promise<Proyecto | any> {
    return firstValueFrom(
      this.httpClient.get<Proyecto | any>(`${this.baseUrl}/obtener/proyecto/${proyectoId}`)
    )
  }

  getProyectos(): Promise<Proyecto[] | any> {
    return firstValueFrom(
      this.httpClient.get<Proyecto[] | any>(this.baseUrl)
    )
  }

  getRegistro(idProyecto: number, mes: number): Promise<[]> {
    return firstValueFrom(
      this.httpClient.get<[]>(`${this.baseUrl}/${idProyecto}/${mes}`)
    )
  }
  getHour(mes: number) {
    return firstValueFrom(
      this.httpClient.get<[]>(`${this.baseUrl}/horasporproyecto/${mes}`)
    )
  }
  getHorasExtra(mes: number) {
    return firstValueFrom(
      this.httpClient.get<[]>(`${this.baseUrl}/obtener/horasextra/${mes}`)
    )
  }

  deleteProyect(proyectoId: number): Promise<Proyecto | any> {
    return firstValueFrom(
      this.httpClient.delete<Proyecto | any>(`${this.baseUrl}/${proyectoId}`)
    );
  };

  create(formValue: any): Promise<Proyecto | any> {
    return firstValueFrom(
      this.httpClient.post<Proyecto | any>(this.baseUrl, formValue)
    );
  }

  update(proyectoId: number, formValue: any): Promise<Proyecto | any> {
    return firstValueFrom(
      this.httpClient.put<Proyecto | any>(`${this.baseUrl}/editar/${proyectoId}`, formValue)
    );
  }



}
