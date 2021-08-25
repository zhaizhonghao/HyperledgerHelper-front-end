import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SmartContractInfo{
  RPCSerer:string;
  ABI:string;
}

@Injectable({
  providedIn: 'root'
})
export class MigrationService {

  private url : string;
  private httpOptions : any;
  smartContractInfo:SmartContractInfo;

  constructor( private httpClient:HttpClient) { 
    this.url = 'http://localhost:3001';
    this.httpOptions= {
      headers: new HttpHeaders({
         'Content-Type':  'application/json'
       })
     };
  }


  register(body){
    return this.httpClient.post(this.appendToUrl('migration','register'),body,this.httpOptions);
  }

  set(body){
    return this.httpClient.post(this.appendToUrl('migration','set'),body,this.httpOptions);
  }

  get(body){
    return this.httpClient.post(this.appendToUrl('migration','get'),body,this.httpOptions);
  }
  
  

  private appendToUrl(...args){
    let urlFull = this.url;
    for (let i = 0; i < args.length; i++) {
      urlFull = urlFull + '/' + args[i];
    }
    return urlFull;
 }

  
}
