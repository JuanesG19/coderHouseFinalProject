import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private loggeado = new Subject<Boolean>();
  loggeadoObservable = this.loggeado.asObservable();

  url = 'https://63c1bc70376b9b2e64830b62.mockapi.io/api/v1';

  constructor(private http: HttpClient) {}

  logginState(state: Boolean){
    this.loggeado.next(state);
  }

  getUsers() {
    return this.http.get(`${this.url}/user`);
  }
}
