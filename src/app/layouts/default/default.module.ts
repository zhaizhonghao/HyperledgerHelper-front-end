import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { RegisterComponent } from 'src/app/modules/identity/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CreateComponent } from 'src/app/modules/channel/create/create.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NodeDeployComponent } from 'src/app/modules/node/node-deploy/node-deploy.component';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { JoinComponent } from 'src/app/modules/channel/join/join.component';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { InstantiateComponent } from 'src/app/modules/contract/instantiate/instantiate.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { InstallComponent } from 'src/app/modules/contract/install/install.component';
import { ApproveComponent } from 'src/app/modules/contract/approve/approve.component';
import { ExplorerComponent } from 'src/app/modules/display/explorer/explorer.component';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/auth/signup/signup.component';
import { AdminComponent } from 'src/app/modules/auth/admin/admin.component';
import {MatTableModule} from '@angular/material/table';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    DefaultComponent,
    RegisterComponent,
    CreateComponent,
    NodeDeployComponent,
    JoinComponent,
    InstantiateComponent,
    InstallComponent,
    ApproveComponent,
    ExplorerComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatGridListModule,
    MatTableModule,
    MarkdownModule.forRoot()
  ]
})
export class DefaultModule { }
