import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {

  usuarios: Usuario[];

  //Services
  usuariosService = inject(UsuariosService);
  router = inject(Router);
  title = inject(Title)
  private darkModeService = inject(DarkModeService);

  constructor() {
    this.title.setTitle('Lista de Usuarios')
    this.usuarios = [];

  };

  async ngOnInit() {
    try {
      const response = await this.usuariosService.getAll();
      this.usuarios = response;
    } catch (error) {
      console.log(error);
    }
  };

  async borrarUser(idUsuario: number) {
    console.log(idUsuario)
    const usuario = await this.usuariosService.deleteUser(idUsuario)
    if (!usuario.fatal) {
      const response = await this.usuariosService.getAll();

      this.usuarios = response;

      Swal.fire({
        title: 'Success!',
        text: 'Acabas de borrar un usuario',
        icon: 'success'
      })

      this.router.navigate(['/usuarios']);

    } else {
      console.log(usuario.fatal)
    }
  }

  get darkMode(): boolean {
    return this.darkModeService.darkMode;
  }
}
