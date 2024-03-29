import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from 'src/app/components/register-student-modal/register-modal.component';
import { JsonService } from 'src/app/services/json.service';
import { StudentsService } from '../../services/students.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

interface LoginStore {
  loginState: Boolean;
}

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
  loggeado: Boolean;

  constructor(
    private matDialog: MatDialog,
    public studentsService: StudentsService,
    private loginService: LoginService,
    private loginStore: Store<LoginStore>
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.loginStore.subscribe(res => {
      this.loggeado = res.loginState;
    })
  }

  loadData() {
    this.studentsService.getStudents().subscribe((res) => {
      this.studentsList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Student),
        };
      });
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
          comision: [],
          telefono: value.telefono,
          pais: value.pais,
        };
        this.studentsService.createStudent(newStudent);
      }
    });
  }

  eliminarUno(student: Student) {
    this.studentsService.deleteStudent(student);
  }

  editar(student: Student) {
    const dialog = this.matDialog.open(RegisterModalComponent, {
      data: student,
    });

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        var newStudent = {
          nombres: data.nombres,
          apellidos: data.apellidos,
          cursos: data.cursos,
          correo: data.correo,
          telefono: data.telefono,
          pais: data.pais,
        };
      }

      this.studentsService.updateStudent(newStudent, student.id);
    });
  }
}
