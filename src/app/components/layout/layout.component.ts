import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(private loginService: LoginService) {
    this.logoCoder = '../../../../assets/img/logoCoder.png';
    this.coderSlogan = '../../../../assets/img/coderSlogan.png';
  }

  ngOnInit(): void {
    this.loginService.loggeadoObservable.subscribe((res) => {
      this.loggeado = res;
    });
  }
}
