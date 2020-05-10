import { Injectable } from '@angular/core';
// Para seguridad en la rutas (CanActivate) y redirecciones (Router)
import { Router, CanActivate} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class IdentityGuard implements CanActivate{
    constructor(
        private _userService: UserService,
        private _routeRedirect: Router
      ){}

    canActivate(){
        if(this._userService.getIdentity() == null){
            this._routeRedirect.navigate(['/login']);
            return false;
        }else{
            return true;
        }
    }
}
