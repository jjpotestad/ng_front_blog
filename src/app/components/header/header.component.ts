import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from '../../services/user.service';
// Para pasar parametros al componente (ActivatedRoute) y redirecciones (Router)
import { Router} from '@angular/router';
import {User} from '../../models/user';
import { global } from '../../services/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {
  public user: User;
  public url: string;

  constructor(
    private _userService: UserService,
    private _routeRedirect: Router
  ) { this.user = new User(this._userService.getIdentity()); 
      this.url = global.urlApi;
  }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.user = this._userService.getIdentity();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    this.user = null;
    this._routeRedirect.navigate(['/login']);
  }
}
