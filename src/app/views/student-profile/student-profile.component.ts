import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import { Course } from '../../models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseModalComponent } from 'src/app/components/add-course-modal/add-course-modal.component';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  displayedColumns: string[] = ['nombreCurso', 'comision', 'opciones'];

  courses: Course[] = [];
  studentCourses: any[] = [];
  student: Student;
  id: string;

  constructor(
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.studentsService.getStudentById(this.id).subscribe((res) => {
      this.student = res as Student;
      this.studentCourses = this.student['cursos'];
    });

    this.coursesService.getCourses().subscribe((res) => {
      this.courses = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Course),
        };
      });
    });
  }

  eliminarCurso(comision) {
    this.studentsService.deleteStudentsCourse(this.id, comision);
  }

  openDialog() {
    const dialog = this.matDialog.open(AddCourseModalComponent);

    dialog.afterClosed().subscribe((value) => {
      var newCourse = this.courses.filter(
        (curso) => curso.comision == value.comision
      );

      this.studentCourses.push({
        comision: newCourse[0].comision,
        nombreCurso: newCourse[0].nombre,
      });

      this.studentsService.addStudentsCourse(this.id, this.studentCourses);
    });
  }
}
