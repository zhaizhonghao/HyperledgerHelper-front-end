import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApproveInfoService {
  installEvent = new Subject<any>();
  private approveInfo;
  private approvers = [];

  setApproveInfo(approveInfo){
    this.approveInfo = approveInfo;
    console.log(this.approveInfo);
  }

  getApprovaInfo(){
    return this.approveInfo;
  }

  addApprovers(peer){
    this.approvers.push(peer)
  }

  getApprovers(){
    return this.approvers;
  }
  constructor() { }
}
