import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url : string;
  private httpOptions : any;
  constructor( private httpClient:HttpClient) { 
    this.url = 'http://localhost:3000';
    this.httpOptions= {
      headers: new HttpHeaders({
         'Content-Type':  'application/json'
       }),
       withCredentials:true
     };
  }

  loginEvent = new Subject<boolean>();
  loginInfoEvent = new Subject<string>();
  roleEvent = new Subject<string>();

  signUp(body){
    return this.httpClient.post(this.appendToUrl('api','register'),body,this.httpOptions);
  }

  signin(body){
    return this.httpClient.post(this.appendToUrl('api','login'),body,this.httpOptions);
  }

  isAuthenticated(){
    return this.httpClient.get(this.appendToUrl('api','user'),this.httpOptions);
  }

  logout(){
    return this.httpClient.post(this.appendToUrl('api','logout'),{},this.httpOptions);
  }

  getAllUsers(){
    return this.httpClient.get(this.appendToUrl('api','user','all'),this.httpOptions);
  }

  deleteUser(body){
    return this.httpClient.post(this.appendToUrl('api','user','delete'),body,this.httpOptions);
  }

  addAcl(body){
    console.log(body)
    return this.httpClient.post(this.appendToUrl('api','acl','add'),body,this.httpOptions);
  }

  deleteAcl(body){
    return this.httpClient.post(this.appendToUrl('api','acl','delete'),body,this.httpOptions);
  }

  getAllAclEntries(){
    return this.httpClient.get(this.appendToUrl('api','acl','all'),this.httpOptions);
  }

  private appendToUrl(...args){
    let urlFull = this.url;
    for (let i = 0; i < args.length; i++) {
      urlFull = urlFull + '/' + args[i];
    }
    return urlFull;
 }
}
