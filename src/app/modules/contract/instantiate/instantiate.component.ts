import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApproveInfoService } from 'src/app/services/approve-info.service';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { ConfigtxService } from 'src/app/services/configtx.service';

@Component({
  selector: 'app-instantiate',
  templateUrl: './instantiate.component.html',
  styleUrls: ['./instantiate.component.scss']
})
export class InstantiateComponent implements OnInit {

  
  status = {
    "approvals": {
            "Org1MSP": true,
            "Org2MSP": false
    }
  }

  args=[];
  counterOfArgs = 0;

  //orgs=["Org1MSP","Org2MSP"];
  orgs=[];
  approvals=[];
  approveInfo;
  instantiateInfo;
  constructor(
    private configtxService:ConfigtxService,
    private approveInfoService:ApproveInfoService,
    private blockchainService:BlockchainService){

  }

  ngOnInit():void{ 
  }

  onCheck(){
    this.approveInfo = this.approveInfoService.getApprovaInfo();
    if (this.approveInfo == null){
      console.log('approveInfo is null')
      return
    }
    console.log(this.approveInfo);
    var peers = this.configtxService.getPeersInChannel();
    var parts = peers[0].HostName.split('.');
    this.approveInfo.ContractInfo.PeerInfo.Org = parts[1];
    this.approveInfo.ContractInfo.PeerInfo.Port = peers[0].Port.toString();
    this.blockchainService.checkApprovalsOfContract(this.approveInfo).subscribe(
      (response:any)=>{
        this.status = JSON.parse(response.Payload);
        console.log("Payload",response.Payload)
        this.orgs = this.configtxService.getOrgsInChannel();
        for (let i = 0; i < this.orgs.length; i++) {
          const org = this.orgs[i];
          this.approvals.push({
            OrgMSP:org,
            isApproved:this.status.approvals[org+"MSP"]
          })
        }
      }
    )
  }

  onInstantiate(){
    if(this.approveInfo == null){
      console.log("approveInfo is null")
      return
    }
    if(this.approveInfoService.getApprovers().length == 0){
      console.log("there is no approver")
      return 
    }
    var instantiateInfo = {
      ContractName:this.approveInfo.ContractInfo.ContractName,
      Language:this.approveInfo.ContractInfo.Language,
      Version:this.approveInfo.ContractInfo.Version,
      Approvers:this.approveInfoService.getApprovers()
    }
    this.instantiateInfo = instantiateInfo;
    this.blockchainService.instantiateContract(instantiateInfo).subscribe(
      (response:any)=>{
        alert(response.Payload)
      }
    )
  }

  onSubmit(f:NgForm){
    //console.log(f.value)
    var argTemp = [];
    for (let i = 0; i < this.args.length; i++) {
      const arg = this.args[i];
      argTemp.push(f.value.Args['arg'+arg])
    }
    var argInfo = {
      function:f.value.function,
      Args:argTemp
    }
    console.log(argInfo)
    var initializeInfo = {
      InstantiateInfo:this.instantiateInfo,
      ArgsJSONString : JSON.stringify(argInfo)
    }
    console.log(JSON.stringify(argInfo))
    this.blockchainService.initializeContract(initializeInfo).subscribe(
      (response:any)=>{
        alert(response.Payload)
      }
    )
  }

  onAddArg(){
    this.counterOfArgs ++ ;
    this.args.push(this.counterOfArgs);
  }

  onRemoveArg(arg){
    for (let i = 0; i < this.args.length; i++) {
      const item = this.args[i];
      if (item === arg) {
        this.args.splice(i,1)
      }
    }
  }
}
