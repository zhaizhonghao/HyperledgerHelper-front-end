import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  hasError = false;
  errMessage = "";
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(f){
    if(f.value.password != f.value.passwordComfirmed){
      this.hasError = true;
      this.errMessage = "The password is not consistent";
      return
    }
    var body = {
      email:f.value.email,
      password:f.value.password
    }
    this.authService.signUp(body).subscribe(
      (res:any)=>{
        if(res.id == 0){
          this.hasError = true;
          this.errMessage = "The email already has  been signed up!";
        }else{
          alert("sign up successfully!")
          this.router.navigate(['/login'])
        }
      },
      err=>{
        this.hasError = true;
        this.errMessage = err.message;
      }
    )
    
  }

  onClearError(){
    this.hasError = false;
  }

  


}
