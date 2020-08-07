import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  filterTerm;
  allMatches = [];
  searchedMatches = [];
  recommendList = [];

  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.getUpcomingMatches();
  }

  search() {
    if (!this.filterTerm) {
      return alert('please enter a search text');
    }
    this.filterMatches();
    this.filterTerm = null;
    console.log('this is search term - ', this.filterTerm);
  }

  filterMatches() {
    this.searchedMatches = this.allMatches.filter((match) =>
      // match.team1.toLocaleLowerCase() === this.filterTerm ||
      // match.team2.toLocaleLowerCase() === this.filterTerm
      match.team1.toLocaleLowerCase().indexOf(this.filterTerm) !== -1 ||
      match.team2.toLocaleLowerCase().indexOf(this.filterTerm) !== -1

    )
    if (!this.searchedMatches.length) {
      alert('no matches found');
    }
    console.log('searched match : ', this.searchedMatches);
  }

  getUpcomingMatches() {
    this.matchService.getUpcomingMatches().subscribe(data => {
      console.log('up data : ', data.matches);
      data.matches.forEach(item => {
        this.allMatches.push({
          date: item.date,
          team1: item['team-1'],
          team2: item['team-2'],
          tossWinner: item.toss_winner_team,
          type: item.type,
          isRecommended: false
        })
      });

      console.log('these are upcoming matches - ', this.allMatches);
    });
  }

  recommend(index) {
    console.log(index);
    this.recommendList.push(this.allMatches[index]);
  }

  toggleRecommended(index) {
    this.allMatches[index].isRecommended = true;
  }

}
