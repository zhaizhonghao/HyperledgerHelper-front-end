import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url : string;
  private httpOptions : any;
  constructor( private httpClient:HttpClient) { 
    this.url = 'http://localhost:8383';
    this.httpOptions= {
      headers: new HttpHeaders({
         'Content-Type':  'application/json'
       })
     };
  }

  register(body){
    return this.httpClient.post(this.appendToUrl('fabricca','register'),body,this.httpOptions);
  }


  private appendToUrl(...args){
    let urlFull = this.url;
    for (let i = 0; i < args.length; i++) {
      urlFull = urlFull + '/' + args[i];
    }
    return urlFull;
 }


}
