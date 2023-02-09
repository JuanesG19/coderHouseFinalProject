import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

interface LoginStore {
  loginState: Boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  loggeado: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private loginStore: Store<LoginStore>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.loginStore.subscribe((res) => {
      this.loggeado = res.loginState;
    });


    if (this.loggeado == true) {
      return true;
    }

    alert('Debes Loggearte Primero');
    return false;
  }
}
