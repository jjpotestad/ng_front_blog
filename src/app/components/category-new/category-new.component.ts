import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [CategoryService,UserService]
})
export class CategoryNewComponent implements OnInit {
  public category: Category;
  public status: string;

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService
  ) { 
    this.category = new Category();
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    let token = this._userService.getToken();
    this._categoryService.create(this.category,token).subscribe(
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
      }
    );
  }
}
