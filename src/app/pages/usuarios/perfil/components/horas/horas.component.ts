import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/interfaces/proyecto.interface';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import * as dayjs from 'dayjs';


@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.css']
})
export class HorasComponent {
  registroForm: FormGroup;

  nombresProyectos: any;
  idProyectos: any[] = []
  proyectos: Proyecto[] = []




  //Services
  activatedRoute = inject(ActivatedRoute);
  usuariosService = inject(UsuariosService);
  proyectosService = inject(ProyectosService)

  constructor() {

    this.registroForm = new FormGroup({
      proyectos_id: new FormControl(null, [
        Validators.required
      ]),
      hora_entrada: new FormControl(null, [
        Validators.required, Validators.pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
      ]),
      hora_salida: new FormControl(null, [
        Validators.required, Validators.pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
      ]),
      fecha: new FormControl(null, [
        Validators.required
      ])

    })

  }

  ngOnInit() {
    this.cargarProyectos();

  }



  async cargarProyectos() {
    try {
      this.proyectos = await this.proyectosService.getProyectos();

      for (let proyecto of this.proyectos) {

        this.idProyectos.push(proyecto.id);
      }
    } catch (error) {
      console.error('Error al cargar los proyectos:', error);
    }
  }


  async onSubmit() {
    const response = await this.usuariosService.getRegistroHour(this.registroForm.value)

    if (!response.fatal) {
      Swal.fire({
        title: 'Success!',
        text: 'Se ha registrado tu jornada',
        icon: 'success'
      })
    }
  }

  obtenerHoraEntrada() {
    this.registroForm.controls['hora_entrada'].setValue(dayjs().format('HH:mm'))
  }
  obtenerHoraSalida() {
    this.registroForm.controls['hora_salida'].setValue(dayjs().format('HH:mm'))
  }


}












































