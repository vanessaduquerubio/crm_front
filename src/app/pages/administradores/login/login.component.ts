import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdministradoresService } from 'src/app/services/administradores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;
  adminServicio = inject(AdministradoresService);
  router = inject(Router);
  title = inject(Title)
  mensajeError: boolean;

  showPassword: boolean = false;

  constructor() {
    this.title.setTitle('Login Admin')
    this.formulario = new FormGroup({
      email: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    })

    this.mensajeError = false
  }

  async onSubmit() {
    const response = await this.adminServicio.getLogin(this.formulario.value);
    console.log(response.token);

    if (response.fatal) {
      // return alert(response.fatal)
      this.mensajeError = true

      Swal.fire({
        title: 'Error!',
        text: response.fatal,
        icon: 'error'
      })
    } else {
      Swal.fire({
        title: 'Success!',
        text: response.success,
        icon: 'success'
      })

      localStorage.setItem('admins_token', response.token)
      this.router.navigate(['/usuarios'])
    }
  }


  checkError(field: string, error: string) {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  }

}
