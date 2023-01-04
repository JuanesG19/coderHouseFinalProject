import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterCourseModalComponent } from 'src/app/components/register-course-modal/register-course-modal.component';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { JsonService } from 'src/app/services/json.service';
import { StudentsService } from 'src/app/services/students.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = [
    'nombre',
    'comision',
    'profesor',
    'estudiantes',
    'opciones',
  ];

  courses: Course[] = [];
  prueba: Course[] = [];
  studentsList: Student[] = [];

  constructor(
    private matDialog: MatDialog,
    public coursesService: CoursesService,
    public studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.loadData();
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
      /* for (let i = 0; i < this.courses.length; i++) {
        var count = 0;
        for (let o = 0; o < this.studentsList.length; o++) {
          if (this.courses[i].comision === this.studentsList[o].comision) {
            count++;
          }
        }
        var newCourse = {
          id: this.courses[i].id,
          nombre: this.courses[i].nombre,
          comision: this.courses[i].comision,
          profesor: this.courses[i].profesor,
          estudiantes: count,
        };
        this.coursesService.updateStudents(newCourse.id, count);
      } */
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

  eliminarCursos() {
    /* this.courses = []; */
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
