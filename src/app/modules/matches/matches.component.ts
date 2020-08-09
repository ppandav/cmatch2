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
      this.matchService.showSnackbar('no matches found', null, 3000);
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

  recommend(index, matchDate) {
    console.log(index);
    // check for duplicate recommendation
    // if (this.searchedMatches[index] === this.recommendList.find(item => item.date === matchDate)) {
    //   alert('item already recommended');
    //   return;
    // }

    if (this.searchedMatches[index].isRecommended) {
      this.searchedMatches[index].isRecommended = false
      this.recommendList.splice(this.recommendList.findIndex(item => item.date === matchDate), 1);
      this.matchService.showSnackbar('match removed from recommendation list', null, 2000);
    } else {
      this.searchedMatches[index].isRecommended = true;
      this.matchService.showSnackbar('match added to recommendation list', null, 2000);
      this.recommendList.push(this.allMatches[index]);
    }
  }

}
