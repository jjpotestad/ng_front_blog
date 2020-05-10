import { Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
// Para pasar parametros al componente (ActivatedRoute) y redirecciones (Router)
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  public user: User;
  public status: string;
  public token: string;
  public identity: any;

  constructor(
    private _userService: UserService,
    private _routeRedirect: Router
  ) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

  login(form){
    this._userService.signup(this.user).subscribe(
      res => {
        if(res.status == 'success')
        {
          this.status = res.status;
          this.token = res.signup.token;

          
          this._userService.signup(this.user, true).subscribe(
            res => {
              if(res.status == 'success')
              {
                this.status = res.status;
                this.identity = res.signup.user;
                
                localStorage.setItem('token',this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                this._routeRedirect.navigate(['/home']);

              }
            },
            err => {
                this.status = 'error';
                console.log(<any>err);
            });
          
        }else{
          this.status = 'error';
        }
      },
      err => {
        this.status = 'error';
        console.log(<any>err);
      });
  }

}
