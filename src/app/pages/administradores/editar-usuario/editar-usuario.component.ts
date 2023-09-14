import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as dayjs from 'dayjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  formulario: FormGroup;
  title = inject(Title)
  router = inject(Router);
  usuarioId: number;

  private darkModeService = inject(DarkModeService);

  //Services
  activatedRoute = inject(ActivatedRoute);
  usuariosService = inject(UsuariosService);
  adminServicio = inject(AdministradoresService)

  constructor() {
    this.title.setTitle('Editar Usuario')
    this.usuarioId = 0;
    this.formulario = new FormGroup({
      nombre: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),

      apellidos: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),

      dni: new FormControl(null, [
        Validators.required,
        this.dniValidator
      ]),

      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/)
      ]),

      telefono: new FormControl(null, [
        Validators.required,
        Validators.minLength(9)
      ]),

      departamento: new FormControl(null, [
        Validators.required,
      ]),

      fecha_alta: new FormControl(null, [
        Validators.required,
      ]),

      estado: new FormControl(null, [
        Validators.required,
      ])
    });
  };

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const usuario = await this.usuariosService.getById(params['usuarioId']);
      console.log(usuario)
      this.usuarioId = params['usuarioId'];

      const fechaFormateada = dayjs(usuario.fecha_alta).format('YYYY-MM-DD');
      const obj = { nombre: usuario.nombre, apellidos: usuario.apellidos, dni: usuario.dni, email: usuario.email, telefono: usuario.telefono, departamento: usuario.departamento, fecha_alta: fechaFormateada, estado: usuario.estado };
      this.formulario.setValue(obj);

    });
  }

  async onSubmit() {
    const response = await this.usuariosService.update(this.usuarioId, this.formulario.value);
    console.log(response)


    if (!response.fatal) {
      Swal.fire({
        title: 'Success!',
        text: 'Actualización con éxito',
        icon: 'success'
      })

      this.router.navigate(['/usuarios']);
    }
  }

  checkError(field: string, error: string) {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  }

  dniValidator(control: AbstractControl) {
    const value = control.value
    const expresionRegularDni = /^\d{8}[a-zA-Z]$/;
    const listaLetras = 'TRWAGMYFPDXBNJZSQVHLCKET';
    if (expresionRegularDni.test(value)) {
      let numero = value.substring(0, value.length - 1);
      let capturaLetra = value.substring(value.length - 1, value.length);
      numero = numero % 23;
      let letraSeleccionada = listaLetras.substring(numero, numero + 1);
      if (letraSeleccionada != capturaLetra.toUpperCase()) {
        return { dnivalidator: 'La letra no coincide' }
      } else {
        return null
      }
    } else {
      return { dnivalidator: 'El formato del DNI es incorrecto' }
    }
  }

  get darkMode(): boolean {
    return this.darkModeService.darkMode;
  }
}

