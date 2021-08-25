import { Component, OnInit } from '@angular/core';
import { MigrationService, SmartContractInfo } from 'src/app/services/migration.service';

@Component({
  selector: 'app-invoke',
  templateUrl: './invoke.component.html',
  styleUrls: ['./invoke.component.scss']
})
export class InvokeComponent implements OnInit {

  result;
  adress;
  isShow = false;
  txID;

  constructor(private migrationService:MigrationService) {

  }

  ngOnInit(): void {
    console.log("on init")
  }
  onSubmit(f){
    this.adress = f.value.Address;
    console.log(this.migrationService.smartContractInfo)
    this.migrationService.set({
      "rpcServer":this.migrationService.smartContractInfo.RPCSerer,
      "abi":this.migrationService.smartContractInfo.ABI,
      "address":f.value.Address,
      "value": +f.value.Value
    })
    .subscribe(      
      (response:any)=>{
        this.isShow = true;
        this.txID = response.txID;
    },
    error =>{
      console.log(error.message)
    })

  }
  onClick(){
    console.log("on click")
    this.migrationService.get({
      "rpcServer":this.migrationService.smartContractInfo.RPCSerer,
      "abi":this.migrationService.smartContractInfo.ABI,
      "address":this.adress,
    })
    .subscribe(      
      (response:any)=>{
      this.result = response.value;
    },
    error =>{
      console.log(error.message)
    })
  }
}
