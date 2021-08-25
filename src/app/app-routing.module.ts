import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { RegisterComponent } from './modules/identity/register/register.component';
import { CreateComponent } from './modules/channel/create/create.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NodeDeployComponent } from './modules/node/node-deploy/node-deploy.component';
import { JoinComponent } from './modules/channel/join/join.component';
import { InstantiateComponent } from './modules/contract/instantiate/instantiate.component';
import { InstallComponent } from './modules/contract/install/install.component';
import { ApproveComponent } from './modules/contract/approve/approve.component';
import { ExplorerComponent } from './modules/display/explorer/explorer.component';
import { WelcomeComponent } from './modules/home/welcome/welcome.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './modules/auth/admin/admin.component';
import { AdminGuardService } from './services/admin-guard.service';
import { MigrateComponent } from './modules/migration/migrate/migrate.component';
import { InvokeComponent } from './modules/migration/invoke/invoke.component';


const routes: Routes = [
  {
    path:'',
    component:DefaultComponent,
    children:
    [
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'signup',
        component:SignupComponent
      },
      {
        path:'management',
        canActivate:[AdminGuardService],
        component:AdminComponent
      },
      {
        path:'identity/Register',
        canActivate:[AuthGuardService],
        component:RegisterComponent
      },
      {
        path:'channel/Create',
        canActivate:[AuthGuardService],
        component:CreateComponent
      },
      {
        path:'channel/Join',
        canActivate:[AuthGuardService],
        component:JoinComponent
      },
      {
        path:'node/Deploy',
        canActivate:[AuthGuardService],
        component:NodeDeployComponent
      },
      {
        path:'contract/Install',
        canActivate:[AuthGuardService],
        component:InstallComponent
      },
      {
        path:'contract/Approve',
        canActivate:[AuthGuardService],
        component:ApproveComponent
      },
      {
        path:'contract/Instantiate',
        canActivate:[AuthGuardService],
        component:InstantiateComponent
      },
      {
        path:'migration/Migrate',
        canActivate:[AuthGuardService],
        component:MigrateComponent
      },
      {
        path:'migration/Invoke',
        canActivate:[AuthGuardService],
        component:InvokeComponent
      },
      {
        path:'display/Explorer',
        canActivate:[AuthGuardService],
        component:ExplorerComponent
      },
      {
        path:'not-found',
        component:NotFoundComponent
      },
    ]
  },
  {
    path:'**',
    redirectTo:'/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
