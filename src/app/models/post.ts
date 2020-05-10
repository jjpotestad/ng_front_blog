import {User} from './user'
import {Category} from './category'

export class Post{
    public id: number;
    public user_id: number;
    public category_id: number;
    public title: string;
    public content: string;
    public image: string;
    public created_at: any;
    public updated_at: any;
    public user: User;
    public category: Category;
    
    constructor(){
        this.id = null;
        this.user_id = null,
        this.category_id = null,
        this.title = null,
        this.content = null,
        this.image = null,
        this.created_at = null,
        this.updated_at = null,
        this.user = new User();
        this.category = new Category();
    }
}