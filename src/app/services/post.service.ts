import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
  
@Injectable()
export class PostService {
    public url: string;

    constructor(
        public _httpclient: HttpClient,
    ){
        this.url = global.urlApi;
    }

    index(token): Observable<any>{
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._httpclient.get(`${this.url}posts`,{headers: header});
    }

    create(post,token): Observable<any>{
        let json = JSON.stringify(post);
        let params = 'json='+json;
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._httpclient.post(`${this.url}posts`,params,{headers: header});
    }

    show(id,token): Observable<any>{
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._httpclient.get(`${this.url}posts/${id}`,{headers: header});
    }

    edit(post,id,token): Observable<any>{
        let json = JSON.stringify(post);
        let params = 'json='+json;
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._httpclient.put(`${this.url}posts/${id}`,params,{headers: header});
    }

    delete(id,token): Observable<any>{
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._httpclient.delete(`${this.url}posts/${id}`,{headers: header});
    }

    
}