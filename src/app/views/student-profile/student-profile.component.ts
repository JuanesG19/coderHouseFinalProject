import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  displayedColumns: string[] = [
    'nombreCurso',
    'comision',
    'opciones',
  ];

  courses: Course[] = [];
  student: Student;
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.id = this.route.snapshot.paramMap.get('id');

    this.studentsService.getStudentById(this.id).subscribe((res) => {
      this.student = res as Student;
      this.courses = this.student['cursos'];
    });
  }

  loadData() {}
}
