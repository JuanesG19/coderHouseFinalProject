import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  opened: boolean;

  /* Images */
  logoCoder: string;
  coderSlogan: string

  constructor() {
    this.logoCoder = "../../../../assets/img/logoCoder.png"
    this.coderSlogan = "../../../../assets/img/coderSlogan.png"
  }

  ngOnInit(): void {}
}
