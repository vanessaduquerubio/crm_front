import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-proyectos',
  templateUrl: './editar-proyectos.component.html',
  styleUrls: ['./editar-proyectos.component.css']
})
export class EditarProyectosComponent {
  formulario: FormGroup
  proyectosService = inject(ProyectosService)
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  darkModeService = inject(DarkModeService)


  proyectoId: number = 0

  title = inject(Title)

  constructor() {
    this.title.setTitle('Editar Proyectos')
    this.formulario = new FormGroup({
      nombre: new FormControl,
      descripcion: new FormControl
    })
  }

  ngOnInit() {


    this.activatedRoute.params.subscribe(async params => {
      const proyecto = await this.proyectosService.getById(params['proyectoId']);
      this.proyectoId = params['proyectoId'];

      const obj = { nombre: proyecto.nombre, descripcion: proyecto.descripcion }

      this.formulario.setValue(obj)
    })
  }

  async onSubmit() {

    const response = await this.proyectosService.update(this.proyectoId, this.formulario.value);
    console.log(response)
    if (!response.fatal) {
      Swal.fire({
        title: 'Success!',
        text: 'Actualización con éxito',
        icon: 'success'
      })

      this.router.navigate(['/proyectos']);
    }

  }
  get darkMode(): boolean {
    return this.darkModeService.darkMode;
  }
}
