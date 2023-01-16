import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: [];

  logoCoderBlack: string;
  coderSlogan: string;
  imageLogin: string;

  formUsername = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  formPassword = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  loginForm = new FormGroup({
    user: this.formUsername,
    password: this.formPassword,
  });

  constructor(public loginService: LoginService, private router: Router) {
    this.logoCoderBlack = '../../../../assets/img/logoCoder.png';
    this.coderSlogan = '../../../../assets/img/coderSlogan.png';
    this.imageLogin = '../../../../assets/img/imageLogin.png';
  }

  ngOnInit(): void {}

  onSubmit() {
    this.loginService.getUsers().subscribe((res) => {
      this.users = res as [];
      /*       console.log( this.users);
       */
      for (var i = 0; i < this.users.length; i++) {
        if (
          this.users[i]['username'] == this.formUsername.value &&
          this.users[i]['password'] == this.formPassword.value
        ) {
          this.loginService.logginState(true);
          this.router.navigate(['/']);
        } else {
          console.log('No loggeado');
        }
      }
    });
  }
}
