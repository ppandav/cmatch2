import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { FavComponent } from './fav/fav.component';

const routes: Routes = [
  { path: '', component: MatchesComponent },
]

@NgModule({
  declarations: [MatchesComponent, FavComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule
  ]
})
export class MatchesModule { }
