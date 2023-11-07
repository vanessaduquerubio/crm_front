import { inject } from "@angular/core";
import { Router } from "@angular/router";

// un admin logueado, visita la pagina de login, le dirigimos a lista usuario
export const LoginAdminGuard = () => {
    const router = inject(Router);

    if (localStorage.getItem('admins_token')) {
        router.navigate(['usuarios']);
        return false;
    } else {
        return true;
    }
}

export const LoginUserGuard = () => {
    const router = inject(Router);

    if (localStorage.getItem('user_token')) {
        router.navigate(['usuarios', 'perfil']);
        return false;
    } else {
        return true;
    }

}



