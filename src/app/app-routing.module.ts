import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './pages/administradores/lista-usuarios/lista-usuarios.component';
import { NuevoUsuarioComponent } from './pages/administradores/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './pages/administradores/editar-usuario/editar-usuario.component';
import { RegistroComponent } from './pages/administradores/registro/registro.component';
import { LoginComponent } from './pages/administradores/login/login.component';
import { LoginAdminGuard, LoginUserGuard } from './guards/login-admin.guards';
import { InicioComponent } from './components/inicio/inicio.component';
import { loginGuard, loginGuardUser } from './guards/login.guards';
import { LoginUsuariosComponent } from './pages/usuarios/login-usuarios/login-usuarios.component';
import { PerfilComponent } from './pages/usuarios/perfil/perfil.component';
import { ListaProyectosComponent } from './pages/administradores/lista-proyectos/lista-proyectos.component';
import { EditarProyectosComponent } from './pages/administradores/editar-proyectos/editar-proyectos.component';
import { NuevoProyectoComponent } from './pages/administradores/nuevo-proyecto/nuevo-proyecto.component';
import { EdicionUsuarioComponent } from './pages/usuarios/perfil/components/edicion-usuario/edicion-usuario.component';



const routes: Routes = [
  { path: 'proyectos', component: ListaProyectosComponent, canActivate: [loginGuard] },
  { path: 'proyectos/nuevo', component: NuevoProyectoComponent, canActivate: [loginGuard] },
  { path: 'proyectos/editar/:proyectoId', component: EditarProyectosComponent, canActivate: [loginGuard] },



  { path: 'usuarios', component: ListaUsuariosComponent, canActivate: [loginGuard] },
  { path: 'usuarios/nuevo', component: NuevoUsuarioComponent, canActivate: [loginGuard] },
  { path: 'admin/editar/:usuarioId', component: EditarUsuarioComponent, canActivate: [loginGuard] },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'login', component: LoginComponent,
    canActivate: [LoginAdminGuard]
  },

  {
    path: 'login/user', component: LoginUsuariosComponent,
    canActivate: [LoginAdminGuard, LoginUserGuard]
  },
  { path: 'usuarios/perfil', component: PerfilComponent, canActivate: [loginGuardUser] },
  { path: 'usuarios/editar/:usuarioId', component: EdicionUsuarioComponent },


  { path: '', component: InicioComponent },


  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }