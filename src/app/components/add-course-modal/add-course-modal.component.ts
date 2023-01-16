import { Component, OnInit, Inject, Optional, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { Student } from '../../models/student.model';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-add-course-modal',
  templateUrl: './add-course-modal.component.html',
  styleUrls: ['./add-course-modal.component.css'],
})
export class AddCourseModalComponent implements OnInit {
  courses: Course[] = [];

  formComision = new FormControl('', [Validators.required]);

  courseForm = new FormGroup({
    comision: this.formComision,
  });

  private dialogData = null;

  constructor(
    @Optional() private dialogRef: MatDialogRef<AddCourseModalComponent>,
    private injector: Injector,
    public coursesService: CoursesService
  ) {
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);

    if (this.dialogData) {
      this.courseForm.patchValue(this.dialogData);
    }
  }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((res) => {
      this.courses = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Course),
        };
      });
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  get comision() {
    return this.courseForm.get('studentForm');
  }
}
