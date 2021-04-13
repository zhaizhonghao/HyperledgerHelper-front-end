import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService:AuthService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated()
    .pipe(
      map((res:any)=>{
        if(res.id != 0){
          return true;
        }else{
          return false;
        }
      }),
      catchError((err)=>{
        this.router.navigate(['/']);
        alert("please login or sign up first!")
        return of(false);
      })
    )
  }
}
