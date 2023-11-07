import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DarkModeService } from 'src/app/services/dark-mode.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  private darkModeService = inject(DarkModeService);

  title = inject(Title)
  get darkMode(): boolean {
    return this.darkModeService.darkMode;
  }
  constructor() {
    this.title.setTitle('Perfil Usuario')
  }
}







