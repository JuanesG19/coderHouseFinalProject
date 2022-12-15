import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterCourseModalComponent } from 'src/app/components/register-course-modal/register-course-modal.component';
import { Course } from 'src/app/models/course.model';
import { JsonService } from 'src/app/services/json.service';

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

  constructor(private matDialog: MatDialog, public json: JsonService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.json.getJson().subscribe((res: any) => {
      const firstStep = JSON.stringify(res);
      const data = JSON.parse(firstStep);

      data.forEach((value) => {
        this.courses.push({
          nombre: value['nombre'],
          comision: value['comision'],
          profesor: value['profesor'],
          estudiantes: Object.keys(value['estudiantes']).length,
        });
      });

      this.courses = Object.values(this.courses);
    });
  }

  openDialog() {
    const dialog = this.matDialog.open(RegisterCourseModalComponent);

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.courses = [...this.courses, value];
        console.log(value);
      }
    });
  }

  eliminarCursos() {
    this.courses = [];
  }

  eliminarUno(course: Course) {
    this.courses = this.courses.filter(
      (deleteCourse) => deleteCourse.comision != course.comision
    );
  }

  editar(course: Course) {
    const dialog = this.matDialog.open(RegisterCourseModalComponent, {
      data: course,
    });

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.courses = this.courses.map((newCourse) =>
          newCourse.comision === course.comision
            ? { ...newCourse, ...data }
            : newCourse
        );
      }
    });
  }

  generarCursos() {
    this.loadData();
  }
}
