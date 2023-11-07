import { Component, inject } from '@angular/core';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { NavigationEnd, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DarkModeService } from 'src/app/services/dark-mode.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuVisible: boolean = false;
  showButton: boolean = true;
  usuariosService = inject(UsuariosService)
  adminServicio = inject(AdministradoresService);

  router = inject(Router);

  darkModeService = inject(DarkModeService);

  isHomePage: boolean = false;

  constructor() {
    this.showButton = !this.usuariosService.isHomePage();
    this.router.events.subscribe((val) => {

      if (val instanceof NavigationEnd) {
        console.log(this.router.url);

        if (this.router.url === '/') {
          this.isHomePage = true
        } else {
          this.isHomePage = false
        }
      }

    })
  }

  onClickLogout() {
    localStorage.removeItem('admins_token');
    this.router.navigate(['/login']);
  }

  toggleMenuVisibility(): void {
    this.menuVisible = !this.menuVisible;
  }
  toggleWebMenu() {
    this.toggleMenuVisibility();
  }
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
    console.log('modo oscuro' + this.darkModeService.darkMode);

  }

  onClickLogoutUser() {
    localStorage.removeItem('user_token');
    this.router.navigate(['/login/user']);
  }

  get darkMode(): boolean {
    return this.darkModeService.darkMode;
  }

}
