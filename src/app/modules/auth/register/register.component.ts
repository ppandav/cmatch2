import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { MatchService } from 'src/app/services/match/match.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //registerForm: FormGroup;

  user = new User();

  constructor(private auth: AuthService, private matchService: MatchService, private router: Router) { }

  ngOnInit(): void {
    /*this.registerForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      isAdmin: new FormControl(null)
    })*/
  }

  register() {
    /*const registerBody = {
      username: this.registerForm.value.firstName + ' ' + this.registerForm.value.lastName,
      email: this.registerForm.value.userName,
      password: this.registerForm.value.password,
      pfirstname: this.registerForm.value.firstName,
      plastname: this.registerForm.value.lastName
    }*/
    this.auth.register(this.user).subscribe(data => {
      this.matchService.showSnackbar('user registered successfully', null, 3000);
      this.router.navigate(['/auth']);
    },
      err => {
        this.matchService.showSnackbar('user registered failed.plz try after sometime', null, 3000);
        console.log('error in registering : ', err);
      })
    console.log("Exception occured..!!");
  }

}
