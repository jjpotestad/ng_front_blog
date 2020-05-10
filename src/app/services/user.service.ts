import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class UserService {
    private url: string;
    private identity;
    private token: string;
    constructor(
        public _httpclient: HttpClient
    ){
        this.url = global.urlApi;
    }

    register(user): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._httpclient.post(`${this.url}users`,params,{headers: header});
    }

    update(user): Observable<any>{
        let id = this.getIdentity().sub;
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._httpclient.put(`${this.url}users/${id}`,params,{headers: header});
    }

    index(): Observable<any>{
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',this.getToken());
        return this._httpclient.get(`${this.url}users`,{headers: header});
    }

    signup(user,gettoken = null): Observable<any>{
        if(gettoken != null){
            user.gettoken = true;
        }
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let header = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._httpclient.post(`${this.url}login`,params,{headers: header});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != null){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let tokenlocal = localStorage.getItem('token');

        if(tokenlocal != null){
            this.token = tokenlocal;
        }
        return this.token;
    }
}