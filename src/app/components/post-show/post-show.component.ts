import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import { global } from '../../services/global';
import { Post } from '../../models/post';
// Para recoger parametros por la URL
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css'],
  providers: [PostService,UserService]
})
export class PostShowComponent implements OnInit {
  public post: Post;
  public status: string;
  public url: string;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _routeParams: ActivatedRoute
  ) { 
    this.url = global.urlApi;
    this.post = new Post();
  }

  ngOnInit(): void {
    this.getPost();
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
              this.post = res.post;
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
}
