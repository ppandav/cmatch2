import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match/match.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(public matchService: MatchService, private auth: AuthService, private router: Router) { }

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
          matchDate: item.date,
          team1: item['team-1'],
          team2: item['team-2'],
          tossWinner: item.toss_winner_team,
          matchType: item.type,
          isRecommended: false
        })
      });
      this.searchedMatches = this.allMatches;
      console.log('these are upcoming matches - ', this.allMatches);
    });
  }

  recommend(index, matchDate) {
    console.log(index);
    // check if the user is logged in
    if (!this.auth.isLoggedIn()) {
      this.matchService.showSnackbar('please login to add matches to favourites', null, 3000);
      this.router.navigate(['/auth']);
      return;
    }
    if (this.searchedMatches[index].isRecommended) {
      this.searchedMatches[index].isRecommended = false;
      this.recommendList.splice(this.recommendList.findIndex(item => item.date === matchDate), 1);

      this.matchService.showSnackbar('match removed from recommendation list', null, 2000);
    } else {
      this.searchedMatches[index].isRecommended = true;
      this.matchService.showSnackbar('match added to recommendation list', null, 2000);
      this.recommendList.push(this.searchedMatches[index]);
      this.addToFavList(this.searchedMatches[index])
    }
  }

  addToFavList(match) {
    this.matchService.addToFavList(JSON.parse(localStorage.getItem('username')), match)
      .subscribe(data => {
        console.log('match added to fav list via api - ', data);
      },
        err => {
          console.log('failed to add match via api - ', err);
        })
  }

  deleteFromFavList() {

  }

}
