import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ConfigService } from 'src/app/services/config.service';
import { NgForm } from '@angular/forms';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { ConfigtxService } from 'src/app/services/configtx.service';
import { BatchSize, Channel, Configtx, Consensus, Organization } from './configtx.model';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

  task: Task = {
    name: 'All',
    completed: false,
    color: 'primary',
    subtasks: []
  };

  canShowSelection = false;
  isGenerating = false;
  error = null;
  markdown = "";
  isGenerated = false;

  constructor(
    private configService:ConfigService,
    private blockchainService:BlockchainService,
    private configtxService:ConfigtxService) { 
    var orgs = this.configService.getOrganizations();
    if(orgs.length != 0){
      this.canShowSelection = true;
    }else{
      this.canShowSelection = false;
    }
    for (let i = 0; i < orgs.length; i++) {
      const org = orgs[i];
      this.task.subtasks.push({
        name:org.Name,
        completed:false,
        color:'primary'
      })
    }
  }

  ngOnInit(): void {

  }

  onSubmit(f:NgForm){
    var configtx = this.handle(f.form.value);
    this.isGenerating = true;
    this.blockchainService.postConfigtx(JSON.stringify(configtx))
      .subscribe(
        (response:any)=>{
          console.log(response);
          this.markdown = 
          `
          \`\`\`yaml
          `
          +response.Payload+
          `
          \`\`\`
          `
          this.isGenerating = false;
          this.isGenerated = true;
      },
      error =>{
        this.error = error.message;
        this.isGenerating = false;
        this.isGenerated = false;
      }
    )
  }

  onClearError(){
    this.error = null;
  }



  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  onReset(f:NgForm){
    f.reset();
  }

  handle(value){
    var orderers = this.configService.getOrderers();
    var batchSize:BatchSize = {
      MaxMessageCount : +value.Consensus.BatchSize.MaxMessageCount,
      AbsoluteMaxBytes:+value.Consensus.BatchSize.AbsoluteMaxBytes,
      PreferredMaxBytes:+value.Consensus.BatchSize.PreferredMaxBytes
    }
    var consensus:Consensus = {
      OrdererType:value.Consensus.OdererType,
      BatchTimeout:+value.Consensus.BatchTimeout,
      BatchSize:batchSize,
      Orderers:orderers
    }
    var organizations = this.configService.getOrganizations();
    var organizationsJoined:Organization[]=[];
    for (let i = 0; i < this.task.subtasks.length; i++) {
      const subtask = this.task.subtasks[i];
      if(subtask.completed){
        var org:Organization = organizations.find(org => org.Name == subtask.name)
        organizationsJoined.push(org);
      }
    }
    var channel:Channel = {
      Name:value.Channel.Name,
      Consortium:value.Channel.Consortium,
      Organizatioins:organizationsJoined
    }
    var configtx:Configtx = {
      Organizations:organizations,
      Consensus:consensus,
      Channel:channel
    }
    this.configtxService.setConfigtx(configtx);
    return configtx;
  }

}
