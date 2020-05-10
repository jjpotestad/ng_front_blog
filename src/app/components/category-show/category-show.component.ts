import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {UserService} from '../../services/user.service';
import { global } from '../../services/global';
import { Category } from '../../models/category';

// Para recoger parametros por la URL
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  styleUrls: ['./category-show.component.css'],
  providers: [CategoryService,UserService]
})
export class CategoryShowComponent implements OnInit {
  public category: Category;
  public status: string;
  public url: string;

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _routeParams: ActivatedRoute
  ) {
    this.url = global.urlApi;
    this.category = new Category;
   }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(){
    this._routeParams.params.subscribe( 
      params => {
        let id = params['id'];
        let token = this._userService.getToken();
        this._categoryService.show(id,token).subscribe(
          res => {
            if(res.status == 'success')
            {
              this.category = res.category;
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
