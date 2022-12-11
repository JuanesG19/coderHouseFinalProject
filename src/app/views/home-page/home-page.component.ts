import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';

const ELEMENT_DATA: Student[] = [
  {
    posicion: 1,
    nombres: 'Juan',
    apellidos: 'Gomez',
    correo: 'juanes@gmail.com',
    pais: 'Colombia',
    telefono: '3124876984',
  },
  {
    posicion: 2,
    nombres: 'Luis',
    apellidos: 'Hernandez',
    correo: 'lucho@gmail.com',
    pais: 'Mexico',
    telefono: '138541681',
  },
  {
    posicion: 3,
    nombres: 'Laura',
    apellidos: 'Luna',
    correo: 'lau@gmail.com',
    pais: 'Guatemala',
    telefono: '6168135165',
  },
];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  displayedColumns: string[] = [
    'posicion',
    'nombres',
    'apellidos',
    'correo',
    'pais',
    'telefono',
    'opciones',
  ];

  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
