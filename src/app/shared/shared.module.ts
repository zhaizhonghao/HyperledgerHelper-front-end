import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list'
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import { NotFoundComponent } from './not-found/not-found.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,  
    NotFoundComponent, 
    HelpDialogComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatTreeModule,
    MatExpansionModule,
    MatDialogModule,
    
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
