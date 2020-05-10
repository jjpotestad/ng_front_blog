import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public status: string;
  // Angular Froala Editor
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  constructor(
    private _userService: UserService,
    private _routeRedirect: Router
  ) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._userService.register(this.user).subscribe(
      res => {
        if(res.status == 'success')
        {
          this.status = res.status;
          form.reset();
          this._routeRedirect.navigate(['../','login']);
        }else{
          this.status = 'error';
        }
      },
      err => {
        this.status = 'error';
        console.log(<any>err);
      }
    );
    
  }

}
