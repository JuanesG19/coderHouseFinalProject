import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterCourseModalComponent } from 'src/app/components/register-course-modal/register-course-modal.component';
import { Course } from 'src/app/models/course.model';
import { JsonService } from 'src/app/services/json.service';
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

  constructor(
    private matDialog: MatDialog,
    public coursesService: CoursesService
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
  }

  openDialog() {
    const dialog = this.matDialog.open(RegisterCourseModalComponent);

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.coursesService.createCourse(value);
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
