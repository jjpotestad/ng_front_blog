import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
  
@Injectable()
export class CategoryService {
    public url: string;

    constructor(
        public _httpclient: HttpClient,
    ){
        this.url = global.urlApi;
    }

    create(category,token): Observable<any>{
        let json = JSON.stringify(category);
        let params = 'json='+json;
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._httpclient.post(`${this.url}categories`,params,{headers: header});
    }

    show(id,token): Observable<any>{
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._httpclient.get(`${this.url}categories/${id}`,{headers: header});
    }

    index(token): Observable<any>{
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._httpclient.get(`${this.url}categories`,{headers: header});
    }

    delete(id,token): Observable<any>{
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);
        return this._httpclient.delete(`${this.url}categories/${id}`,{headers: header});
    }
}