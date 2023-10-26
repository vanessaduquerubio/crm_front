import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {
  formulario: FormGroup;
  usuarioServices = inject(UsuariosService);
  router = inject(Router);
  title = inject(Title)

  private darkModeService = inject(DarkModeService);

  constructor() {
    this.title.setTitle('Nuevo Usuario')
    this.formulario = new FormGroup({
      // id: new FormControl(),
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

      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      ]),

      telefono: new FormControl(null, [
        Validators.required,
        Validators.minLength(9)
      ]),

      estado: new FormControl(null, [
        Validators.required,
      ]),

      fecha_alta: new FormControl(null, [
        Validators.required,
      ]),

      departamento: new FormControl(null, [
        Validators.required,
      ])
    })
  }


  async onSubmit(): Promise<any> {
    const response = await this.usuarioServices.create(this.formulario.value);


    if (response.fatal) {

      if (response.fatal.includes('usuarios.dni_UNIQUE')) {
        return Swal.fire({
          title: 'Error!',
          text: 'DNI ya existe',
          icon: 'error'
        })

      } else if (response.fatal.includes('usuarios.telefono_UNIQUE')) {
        return Swal.fire({
          title: 'Error!',
          text: 'Telefono ya existe',
          icon: 'error'
        })

      } else if (response.fatal.includes('usuarios.email_UNIQUE')) {

        return Swal.fire({
          title: 'Error!',
          text: 'Correo ya existe',
          icon: 'error'
        })
      }
    } else {
      Swal.fire({
        title: 'Success!',
        text: 'creación de nuevo usuario con éxito',
        icon: 'success'
      })

      this.router.navigate(['/usuarios']);
    }


    Swal.fire({
      title: 'Success!',
      text: 'Se ha registrado con éxito',
      icon: 'success'
    })

    // Inserción correcta
    this.router.navigate(['/usuarios']);

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
