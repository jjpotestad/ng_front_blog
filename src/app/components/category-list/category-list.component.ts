import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryService,UserService]
})
export class CategoryListComponent implements OnInit {
  public categories;
  public status: string;

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
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
      }
    )
  }

  delete(id){
    let token = this._userService.getToken();
    this._categoryService.delete(id,token).subscribe(
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
      }
    )
  }

}
