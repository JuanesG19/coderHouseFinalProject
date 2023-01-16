import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  loggeado: Boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.loggeadoObservable.subscribe((res) => {
      this.loggeado = res;
    });
  }

}
