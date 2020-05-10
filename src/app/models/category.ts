import {Post} from './post'

export class Category{
    public id: number;
    public name: string;
    public posts: Post[];
    constructor(){
        this.id = null;
        this.name = null;
        // this.posts = new Post()[];
    }
}