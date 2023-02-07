import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutAction } from 'src/app/ngrx/actions/login.actions';
import { LoginService } from 'src/app/services/login.service';

interface LoginStore {
  loginState: Boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  opened: boolean;
  loggeado: Boolean = false;

  /* Images */
  logoCoder: string;
  coderSlogan: string;

  constructor(
    private loginStore: Store<LoginStore>
  ) {
    this.logoCoder = '../../../../assets/img/logoCoder.png';
    this.coderSlogan = '../../../../assets/img/coderSlogan.png';
  }

  ngOnInit(): void {
    this.loginStore.subscribe((res) => {
      this.loggeado = res.loginState;
    });
  }

  logout(){
    const action = new LogoutAction();
    this.loginStore.dispatch(action);
  }
}
