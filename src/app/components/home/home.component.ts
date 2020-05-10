import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
// Para pasar parametros al componente (ActivatedRoute) y redirecciones (Router)
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _routeRedirect: Router
  ) {}

  ngOnInit(): void {}

}
