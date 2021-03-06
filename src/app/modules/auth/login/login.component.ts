import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatchService } from 'src/app/services/match/match.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //loginForm: FormGroup;

  user = new User();

  constructor(private router: Router, private auth: AuthService, private matchService: MatchService) { }

  ngOnInit(): void {
    //this.loginForm = new FormGroup({
      //username: new FormControl(null, [Validators.required]),
      //password: new FormControl(null, [Validators.required]),
    //})
  }

  login() 
  {
    // this.router.navigate(['/dashboard'])
    this.auth.login(this.user).subscribe((data: any) => 
    {
        this.matchService.showSnackbar('you have been logged in successfully', null, 3000);

        localStorage.setItem('user', JSON.stringify(this.user.userName));

        localStorage.setItem('token', JSON.stringify(data.token));

        this.router.navigate(['/dashboard']);
        console.log(data);
      },
        err => {
          this.matchService.showSnackbar('error while logging in,plz try again later', null, 3000);
        })
    console.log("Exception occured");
  }

}
