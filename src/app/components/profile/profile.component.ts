import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
// Para pasar parametros al componente (ActivatedRoute) y redirecciones (Router)
import { Router} from '@angular/router';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  public user: User;
  public status: string;
  public url: string;
  // Angular Froala Editor
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
  // Angular File Uploader
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "1",
    uploadAPI:  {
      url: global.urlApi+"users/upload",
      headers: {
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Upload avatar',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private _userService: UserService,
    private _routeRedirect: Router
  ) { 
    this.user = new User();
    this.url = global.urlApi;
  }

  ngOnInit(): void {
      this.user = this._userService.getIdentity();
  }

  onSubmit(form){
    this._userService.update(this.user).subscribe(
      res => {
        if(res.status == 'success')
        {
          this.status = res.status;
          this.user = res.user;
                
          localStorage.setItem('identity', JSON.stringify(this.user));
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

  avatarUpload(data){
    let file = JSON.parse(data.response);
    this.user.avatar = file.avatar;
  }
}
