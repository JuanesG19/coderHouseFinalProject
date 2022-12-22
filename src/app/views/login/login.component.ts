import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  formPassword = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  loginForm = new FormGroup({
    user: this.formLogin,
    password: this.formPassword,
  });

  constructor() {}

  ngOnInit(): void {}
}
