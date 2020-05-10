import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [PostService,UserService,CategoryService]
})
export class PostNewComponent implements OnInit {
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
  ) { 
    this.post = new Post();
    this.url = global.urlApi;
  }

  ngOnInit(): void {
    this.post.user_id = this._userService.getIdentity().sub;
    this.getCategories();
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
    let token = this._userService.getToken();
    this._postService.create(this.post,token).subscribe(
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
  }

  imageUpload(data){
    let file = JSON.parse(data.response);
    this.post.image = file.image;
    console.log(this.post);
  }
}
