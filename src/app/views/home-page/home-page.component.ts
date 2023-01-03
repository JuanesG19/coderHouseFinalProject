import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from 'src/app/components/register-student-modal/register-modal.component';
import { JsonService } from 'src/app/services/json.service';
import { StudentsService } from '../../services/students.service';

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

  constructor(
    private matDialog: MatDialog,
    public studentsService: StudentsService,
    public json: JsonService
  ) {}

  ngOnInit(): void {
    this.loadData();
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
          comision: value.comision,
          nombreCurso: value.nombreCurso,
          telefono: value.telefono,
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
