import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterCourseModalComponent } from 'src/app/components/register-course-modal/register-course-modal.component';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { JsonService } from 'src/app/services/json.service';
import { LoginService } from 'src/app/services/login.service';
import { StudentsService } from 'src/app/services/students.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = [];

  courses: Course[] = [];
  prueba: Course[] = [];
  studentsList: any[] = [];
  loggeado: Boolean;

  constructor(
    private matDialog: MatDialog,
    public coursesService: CoursesService,
    public studentsService: StudentsService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.loginService.loggeadoObservable.subscribe((res) => {
      this.loggeado = res;
      console.log(this.loggeado);
      if (this.loggeado == true) {
        this.displayedColumns = [
          'nombre',
          'comision',
          'profesor',
          'estudiantes',
          'opciones',
          'verMas',
        ];
      } else {
        this.displayedColumns = [
          'nombre',
          'comision',
          'profesor',
          'estudiantes',
        ];
      }
    });
  }

  loadData() {
    this.coursesService.getCourses().subscribe((res) => {
      this.courses = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Course),
        };
      });
    });

    //Obtiene los estudiantes
    this.studentsService.getStudents().subscribe((res) => {
      this.studentsList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Student),
        };
      });

      var comisiones = [];
      for (var i = 0; i < this.studentsList.length; i++) {
        var prueba = this.studentsList[i].cursos;
        for (var o = 0; o < prueba.length; o++) {
          comisiones.push(prueba[o].comision);
        }
      }

      for (var i = 0; i < this.courses.length; i++) {
        var cursos = this.courses[i];
        var count = 0;
        for (var o = 0; o < comisiones.length; o++) {
          if (cursos.comision == comisiones[o]) {
            count++;
          }
        }
        this.coursesService.updateStudents(cursos.id, count);
      }
    });
  }

  openDialog() {
    const dialog = this.matDialog.open(RegisterCourseModalComponent);

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        var newCourse = {
          nombre: value.nombre,
          comision: value.comision,
          profesor: value.profesor,
          estudiantes: 0,
        };
        this.coursesService.createCourse(newCourse);
      }
    });
  }

  eliminarUno(course: Course) {
    this.coursesService.deleteCourse(course);
  }

  editar(course: Course) {
    const dialog = this.matDialog.open(RegisterCourseModalComponent, {
      data: course,
    });

    dialog.afterClosed().subscribe((data) => {
      this.coursesService.updateCourse(data, course.id);
    });
  }
}
