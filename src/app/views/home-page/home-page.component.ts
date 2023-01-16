import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from 'src/app/components/register-student-modal/register-modal.component';
import { JsonService } from 'src/app/services/json.service';
import { StudentsService } from '../../services/students.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

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
    'telefono',
    'pais',
    'opciones',
    'cursos',
  ];

  studentsList: Student[] = [];
  loggeado: Boolean = false;

  constructor(
    private matDialog: MatDialog,
    public studentsService: StudentsService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.loginService.loggeadoObservable.subscribe((res) => {
      this.loggeado = res;
      console.log(this.loggeado);
    });
  }

  loadData() {
    this.studentsService.getStudents().subscribe((res) => {
      this.studentsList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Student),
        };
      });
      console.log(this.studentsList);
    });
  }

  openDialog() {
    const dialog = this.matDialog.open(RegisterModalComponent);

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        var newStudent = {
          nombres: value.nombres,
          apellidos: value.apellidos,
          correo: value.correo,
          comision: [
            { comision: '6666', nombreCurso: 'CSS' },
            { comision: '1234', nombreCurso: 'Angular' },
            { comision: '7777', nombreCurso: 'HTML' },
          ],
          telefono: value.telefono,
          pais: value.pais,
        };
        this.studentsService.createStudent(newStudent);
      }
    });
  }

  eliminarTodos() {
    /* this.studentsList = []; */
  }

  eliminarUno(student: Student) {
    this.studentsService.deleteStudent(student);
  }

  editar(student: Student) {
    const dialog = this.matDialog.open(RegisterModalComponent, {
      data: student,
    });

    dialog.afterClosed().subscribe((data) => {
      this.studentsService.updateStudent(data, student.id);
    });
  }
}
