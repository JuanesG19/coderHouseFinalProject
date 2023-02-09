import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-course-profile',
  templateUrl: './course-profile.component.html',
  styleUrls: ['./course-profile.component.css'],
})
export class CourseProfileComponent implements OnInit {
  displayedColumns: string[] = [
    'nombres',
    'apellidos',
    'correo',
    'telefono',
    'pais',
  ];

  courses: Course[] = [];
  course: any;
  students: any[] = [];
  studentsCourse: any[] = [];
  comisionRoute: string;
  list: any;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.comisionRoute = this.route.snapshot.paramMap.get('comision');

    this.coursesService.getCourses().subscribe((res) => {
      this.courses = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Course),
        };
      });

      this.course = this.courses.filter(
        (curso) => curso.comision == this.comisionRoute
      );
    });

    this.studentsService.getStudents().subscribe((res) => {
      this.students = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Student),
        };
      });

      for (var i = 0; i < this.students.length; i++) {
        var prueba = this.students[i].cursos;
        for (var o = 0; o < prueba.length; o++) {
          if (prueba[o].comision == this.course[0].comision) {
            this.studentsCourse.push(this.students[i]);
          }
        }
      }
    });
  }
}
