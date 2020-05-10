import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import { global } from '../../services/global';
// Para recoger parametros por la URL y redirecciones (Router)
import {ActivatedRoute,Router} from "@angular/router";


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [PostService,UserService,CategoryService]
})
export class PostEditComponent implements OnInit {
  public post: Post;
  public categories;
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
      url: global.urlApi+"posts/upload",
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
    private _postService: PostService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _routeParams: ActivatedRoute,
    private _routeRedirect: Router
  ) { 
    this.post = new Post();
    this.url = global.urlApi;
  }

  ngOnInit(): void {
    this.getPost(); 
    this.getCategories();
  }

  getPost(){
    this._routeParams.params.subscribe( 
      params => {
        let id = params['id'];
        let token = this._userService.getToken();
        this._postService.show(id,token).subscribe(
          res => {
            if(res.status == 'success')
            {
              if(res.post.user_id == this._userService.getIdentity().sub){
                this.post = res.post;
              }else{
                this._routeRedirect.navigate(['../../posts']);
              }
            }else{
              this.status = 'error';
            }
          },
          err => {
            this.status = 'error';
            console.log(<any>err);
          })
      })
  }

  getCategories(){
    let token = this._userService.getToken();
    this._categoryService.index(token).subscribe(
      res => {
        if(res.status == 'success')
        {
          this.categories = res.categories;
        }else{
          this.status = 'error';
        }
      },
      err => {
        this.status = 'error';
        console.log(<any>err);
      })
  }

  onSubmit(form){
    this._routeParams.params.subscribe( 
      params => {
        let id = params['id'];
        let token = this._userService.getToken();
        this._postService.edit(this.post,id,token).subscribe(
          res => {
            if(res.status == 'success')
            {
              this.status = res.status;
              form.reset();
            }else{
              this.status = 'error';
            }
          },
          err => {
            this.status = 'error';
            console.log(<any>err);
          })
      })
  }

  imageUpload(data){
    let file = JSON.parse(data.response);
    this.post.image = file.image;
  }
}
