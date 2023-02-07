import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginAction } from 'src/app/ngrx/actions/login.actions';
import { LoginService } from 'src/app/services/login.service';

interface LoginStore {
  loginState: Boolean;
}

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

  constructor(
    public loginService: LoginService,
    private router: Router,
    private loginStore: Store<LoginStore>
  ) {
    this.logoCoderBlack = '../../../../assets/img/logoCoder.png';
    this.coderSlogan = '../../../../assets/img/coderSlogan.png';
    this.imageLogin = '../../../../assets/img/imageLogin.png';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    var succes = false;
    this.loginService.getUsers().subscribe((res) => {
      this.users = res as [];
      for (var i = 0; i < this.users.length; i++) {
        if (
          this.users[i]['username'] == this.formUsername.value &&
          this.users[i]['password'] == this.formPassword.value
        ) {
          succes = true;
          const action = new LoginAction();

          this.loginStore.dispatch(action);
          this.router.navigate(['/']);
        }
      }

      if (succes == !true) {
        alert('Usuario o Contraseña Incorrecto');
      }
    });
  }
}
