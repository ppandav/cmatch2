import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MatchService } from 'src/app/services/match/match.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'krishna', component: DashboardComponent },
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule
  ],
  providers: [
    MatchService
  ]
})
export class DashboardModule { }
