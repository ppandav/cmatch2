import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match/match.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatchPopupComponent } from '../match-popup/match-popup.component';

@Component({
  selector: 'app-upcoming-matches',
  templateUrl: './upcoming-matches.component.html',
  styleUrls: ['./upcoming-matches.component.css']
})
export class UpcomingMatchesComponent implements OnInit {


  upcomingMatches = [];

  constructor(public matchService: MatchService, private auth: AuthService, private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUpcomingMatches();
  }

  getUpcomingMatches() {
    this.matchService.getUpcomingMatches().subscribe(data => {
      console.log('up data : ', data.matches);
      data.matches.forEach(item => {
        this.upcomingMatches.push({
          matchDate: item.date,
          team1: item['team-1'],
          team2: item['team-2'],
          tossWinner: item.toss_winner_team,
          matchType: item.type,
          isRecommended: false,
          winner: data.winner_team ? data.winner_team : ''
        })
      });
    });
  }

  viewMatchDetails(match) {
    console.log("Match info on click:" + match);
    // const dialogref = this.dialog.open(MatchPopupComponent,
    //   {
    //     width: "30vw", height: "60vh",
    //     data: match
    //   });
    const dialogRef = this.dialog.open(MatchPopupComponent, { data: match });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}
