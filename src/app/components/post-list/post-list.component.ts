import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService,UserService]
})
export class PostListComponent implements OnInit {
  public posts;
  public user;
  public status: string;
  public url: string;

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.url = global.urlApi;
   }

  ngOnInit(): void {
    this.user = this._userService.getIdentity();
    this.getPosts();
  }

  getPosts(){
    let token = this._userService.getToken();
    this._postService.index(token).subscribe(
      res => {
        if(res.status == 'success')
        {
          this.posts = res.posts;
        }else{
          this.status = 'error';
        }
      },
      err => {
        this.status = 'error';
        console.log(<any>err);
      })
  }

  delete(id){
    let token = this._userService.getToken();
    this._postService.delete(id,token).subscribe(
      res => {
        if(res.status == 'success')
        {
          this.status = res.status;
          location.reload();
        }else{
          this.status = 'error';
        }
      },
      err => {
        this.status = 'error';
        console.log(<any>err);
      })
  }
}
