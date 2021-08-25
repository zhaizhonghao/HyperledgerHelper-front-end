import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HelpDialogComponent } from '../../help-dialog/help-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe = new EventEmitter<any>();

  isLogin = false;
  email = "";
  isAdmin = false;
  constructor(public dialog: MatDialog,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    console.log("on header init")
    this.authService.isAuthenticated().subscribe(
      (res:any)=>{
        if(res.id!=0){
          this.isLogin = true;
        }else{
          this.isLogin = false;
        }
        if(res.role == "admin"){
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
        this.email = res.email;
      }
    )
    this.authService.loginEvent.subscribe(
      (isLogin:boolean)=>{
        this.isLogin = isLogin;
      }
    )
    this.authService.loginInfoEvent.subscribe(
      (email:string)=>{
        this.email = email;
      }
    )
    this.authService.roleEvent.subscribe(
      (role:string)=>{
        if(role == "admin"){
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
      }
    )
  }

  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }

  openDialog(){
    this.dialog.open(HelpDialogComponent)
  }

  onLogin(){
    this.router.navigate(['/login']);
  }

  onSignUp(){
    this.router.navigate(['/signup']);
  }

  onLogout(){
    this.authService.logout().subscribe(
      (res)=>{
        this.isLogin = false;
        this.router.navigate(['/']);
      }
    )
  }
  onManage(){
    this.router.navigate(['/management']);
  }
}
