import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match/match.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  upcomingMatches = [];
  isLoading = false;
  oldMatches;
  listFilter;

  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.getUpcomingMatches();
    this.getOldMatches();
  }

  getUpcomingMatches() {
    this.matchService.getUpcomingMatches().subscribe(data => {
      this.isLoading = true;
      console.log('up data : ', data.matches);
      data.matches.forEach(item => {
        this.upcomingMatches.push({
          date: item.date,
          team1: item['team-1'],
          team2: item['team-2'],
          tossWinner: item.toss_winner_team,
          type: item.type
        })
      })
      console.log('these are upcoming matches - ', this.upcomingMatches);
      this.isLoading = false;
    });
  }

  getOldMatches() {
    this.matchService.getOldMatches().subscribe(data => {
      this.isLoading = true;
      this.oldMatches = data.data;
      console.log('these are old matches - ', data);
    });
    this.isLoading = false;
  }

  search() {

  }





}
