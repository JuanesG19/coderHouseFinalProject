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
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  loggeado: any;

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.loggeado == true) {
      return this.router.navigate(['/students']).then(() => false);
    }

    alert('Debes Loggearte Primero');
    return false;
  }

  hasLogin(): boolean {
    this.loginService.loggeadoObservable.subscribe((res) => {
      this.loggeado = res;
    });

    return this.loggeado;
  }
}
