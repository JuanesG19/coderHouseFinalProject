import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from 'src/app/components/register-student-modal/register-modal.component';
import { JsonService } from 'src/app/services/json.service';

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
    'comision',
    'curso',
    'telefono',
    'opciones',
  ];

  studentsList: Student[] = [];

  constructor(private matDialog: MatDialog, public json: JsonService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.json.getJson().subscribe((res: any) => {
      const firstStep = JSON.stringify(res);
      const data = JSON.parse(firstStep);

      data.forEach((value, i) => {
        const list = value['estudiantes'];

        list.forEach((listValue) => {
          this.studentsList.push(listValue);
        });
      });

      this.studentsList = Object.values(this.studentsList);
    });
  }

  openDialog() {
    const dialog = this.matDialog.open(RegisterModalComponent);

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.studentsList = [...this.studentsList, value];
      }
    });
  }

  eliminarTodos() {
    this.studentsList = [];
  }

  eliminarUno(student: Student) {
    this.studentsList = this.studentsList.filter(
      (deleteStudent) => deleteStudent.correo != student.correo
    );
  }

  editar(student: Student) {
    const dialog = this.matDialog.open(RegisterModalComponent, {
      data: student,
    });

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.studentsList = this.studentsList.map((newStudent) =>
          newStudent.correo === student.correo
            ? { ...newStudent, ...data }
            : newStudent
        );
      }
    });
  }

  generarEstudiantes() {
    this.loadData();
  }
}
