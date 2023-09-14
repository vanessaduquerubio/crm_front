import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './pages/administradores/lista-usuarios/lista-usuarios.component';
import { NuevoUsuarioComponent } from './pages/administradores/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './pages/administradores/editar-usuario/editar-usuario.component';
import { PerfilComponent } from './pages/usuarios/perfil/perfil.component';
import { RegistroComponent } from './pages/administradores/registro/registro.component';
import { LoginComponent } from './pages/administradores/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DatosPerfilComponent } from './pages/usuarios/perfil/components/datos-perfil/datos-perfil.component';
import { ProyectosComponent } from './pages/usuarios/perfil/components/proyectos/proyectos.component';
import { HorasComponent } from './pages/usuarios/perfil/components/horas/horas.component';
import { NgChartsModule } from 'ng2-charts';

import { InicioComponent } from './components/inicio/inicio.component';

import { LoginUsuariosComponent } from './pages/usuarios/login-usuarios/login-usuarios.component';
import { ListaProyectosComponent } from './pages/administradores/lista-proyectos/lista-proyectos.component';
import { EditarProyectosComponent } from './pages/administradores/editar-proyectos/editar-proyectos.component';
import { NuevoProyectoComponent } from './pages/administradores/nuevo-proyecto/nuevo-proyecto.component';
import { EdicionUsuarioComponent } from './pages/usuarios/perfil/components/edicion-usuario/edicion-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    PerfilComponent,
    RegistroComponent,
    LoginComponent,
    MenuComponent,
    DatosPerfilComponent,
    ProyectosComponent,
    HorasComponent,
    InicioComponent,
    LoginUsuariosComponent,
    ListaProyectosComponent,
    EditarProyectosComponent,
    NuevoProyectoComponent,
    EdicionUsuarioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
