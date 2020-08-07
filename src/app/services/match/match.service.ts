import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  apikey = 'XCk4MXRlGwMcl4eeWMilQP4oCzB2';

  constructor(private http: HttpClient) { }

  getUpcomingMatches(): Observable<any> {
    return this.http.get('https://cricapi.com/api/matches?apikey=' + this.apikey);
  }

  getOldMatches(): Observable<any> {
    return this.http.get('https://cricapi.com/api/cricket?apikey=' + this.apikey);
  }
}
