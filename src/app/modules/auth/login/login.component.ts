import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  hasError = false;
  errMessage = "";
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    var body = {
      email:f.value.email,
      password:f.value.password
    }
    this.authService.signin(body)
    .subscribe(
      (res:any)=>{
        alert("Login successfully!");
        this.authService.loginEvent.next(true);
        this.authService.loginInfoEvent.next(f.value.email);
        this.authService.roleEvent.next(res.role);
        this.router.navigate(['/']);
      },
      error=>{
        this.hasError = true;
        this.errMessage = error.message;
        console.log("error",error.message)
      }
    )
  }

  onClearError(){
    this.hasError = false;
  }



}
