import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';

const ELEMENT_DATA: Student[] = [
  {
    nombres: 'Juan',
    apellidos: 'Gomez',
    correo: 'juanes@gmail.com',
    pais: 'Colombia',
    telefono: '3124876984',
  },
  {
    nombres: 'Luis',
    apellidos: 'Hernandez',
    correo: 'lucho@gmail.com',
    pais: 'Mexico',
    telefono: '138541681',
  },
  {
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
    'nombres',
    'apellidos',
    'correo',
    'pais',
    'telefono',
    'opciones',
  ];

  dataSource = ELEMENT_DATA;

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialog = this.matDialog.open(RegisterModalComponent);

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.dataSource = [...this.dataSource, value];
      }
    });
  }

  eliminarTodos() {
    this.dataSource = [];
  }

  eliminarUno(student: Student) {
    this.dataSource = this.dataSource.filter(
      (deleteStudent) => deleteStudent.correo != student.correo
    );
  }

  generarEstudiantes() {
    this.dataSource = ELEMENT_DATA;
  }
}
