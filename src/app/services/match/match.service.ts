import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MatSnackBar } from "@angular/material/snack-bar";
@Injectable({
  providedIn: 'root'
})
export class MatchService {

  apikey = 'XCk4MXRlGwMcl4eeWMilQP4oCzB2';

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  getUpcomingMatches(): Observable<any> {
    return this.http.get('https://cricapi.com/api/matches?apikey=' + this.apikey);
  }

  getOldMatches(): Observable<any> {
    return this.http.get('https://cricapi.com/api/cricket?apikey=' + this.apikey);
  }

  utcToLocal(utcDate: string, format: string) {
    // convert utc to local
    const stillUtc = moment.utc(utcDate).toDate();
    const local = moment(stillUtc).local().format(format);
    return local;
  }

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration,
    });
  }
}
