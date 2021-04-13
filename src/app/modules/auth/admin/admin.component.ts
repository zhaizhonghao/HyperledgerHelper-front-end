import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { Entry } from './entry.model';
import { User } from './user.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {



  newEmail = ""
  constructor(private authService:AuthService) { 
  }

  displayedColumns: string[] = ['position', 'email','operation'];
  dataSource = new MatTableDataSource<Entry>();
  users = new MatTableDataSource<User>();
  displayedColumnsOfUsers: string[] = ['position', 'email','role','operation'];

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(
      (users:any)=>{
        var data:User[] = []
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          data.push({position:i,email:user.email,role:user.role})
        }
        this.users.data = data;
      }
    )
    this.authService.getAllAclEntries().subscribe(
      (entries:any)=>{
        var data:Entry[] = []
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          data.push({position:i,email:entry.email})
        }
        this.dataSource.data = data;
      }
    )
  }

  onAdd(){
    var newData = this.dataSource.data.slice()
    newData.push({
        position:this.dataSource.data.length+1,
        email:this.newEmail
    })
    this.dataSource.data = newData;
    this.authService.addAcl({email:this.newEmail}).subscribe(
      (res)=>{
        console.log(res)
      }
    )
    this.newEmail = "";
  }

  onDelete(email){
    var newData = this.dataSource.data.slice()
    var entry = newData.find((a)=>{
      if(a.email == email){
        return a;
      }
    })
    this.authService.deleteAcl({email:entry.email}).subscribe(
      (res)=>{
        console.log(res);
      }
    )
    newData.splice(newData.indexOf(entry),1);
    this.dataSource.data = newData;
  }

  onDeleteUser(email){
    var newData = this.users.data.slice()
    var user = newData.find((a)=>{
      if(a.email == email){
        return a;
      }
    })
    this.authService.deleteUser({email:user.email,role:user.role}).subscribe(
      (res)=>{
        console.log(res);
      }
    )
    newData.splice(newData.indexOf(user),1);
    this.users.data = newData;
  }

}
