import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/services/login.service';

interface LoginStore {
  loginState: Boolean;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  loggeado: Boolean;

  constructor(
    private loginService: LoginService,
    private loginStore: Store<LoginStore>
  ) {}

  ngOnInit(): void {
    this.loginStore.subscribe((res) => {
      this.loggeado = res.loginState;
      console.log(res);
    });
  }
}
