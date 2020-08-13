import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CurrentMatchesComponent } from './current-matches/current-matches.component';
import { UpcomingMatchesComponent } from './upcoming-matches/upcoming-matches.component';
import { MatchPopupComponent } from './match-popup/match-popup.component';

const routes: Routes = [
  { path: '', component: MatchesComponent },
  { path: 'upcoming', component: UpcomingMatchesComponent },
]

@NgModule({
  declarations: [MatchesComponent, CurrentMatchesComponent, UpcomingMatchesComponent, MatchPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule
  ]
})
export class MatchesModule { }
