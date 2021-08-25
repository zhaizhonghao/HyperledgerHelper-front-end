import { Component, OnInit } from '@angular/core';
import { MigrationService } from 'src/app/services/migration.service';

@Component({
  selector: 'app-migrate',
  templateUrl: './migrate.component.html',
  styleUrls: ['./migrate.component.scss']
})
export class MigrateComponent implements OnInit {

  constructor(private migrationService:MigrationService) { }

  address;

  ngOnInit(): void {
  }
  onSubmit(f){
    console.log(f.value)
    var content = {
      "rpcServer": f.value.RPCServer,
      "bytecodes" : f.value.SmartContract.Bytecodes,
      "abi": JSON.parse(f.value.SmartContract.ABI) 
    }
    this.migrationService.smartContractInfo = {RPCSerer:f.value.RPCServer,ABI:JSON.parse(f.value.SmartContract.ABI)};
    this.migrationService.register(JSON.stringify(content))
    .subscribe(
      (response:any)=>{
        console.log("response",response)
        this.address = response.address;
        alert("Create the smart contract successfully!");
      },
      error =>{
        console.log(error.message)
      }
    )
  }

  onReset(f){
    f.reset();
  }
}
