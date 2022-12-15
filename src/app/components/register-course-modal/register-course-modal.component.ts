import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-register-course-modal',
  templateUrl: './register-course-modal.component.html',
  styleUrls: ['./register-course-modal.component.css'],
})
export class RegisterCourseModalComponent implements OnInit {
  formNombre = new FormControl('',[Validators.required, Validators.nullValidator]);
  formComision = new FormControl('',[Validators.required, Validators.nullValidator]);
  formProfesor = new FormControl('',[Validators.required, Validators.nullValidator]);
  formEstudiantes = new FormControl('',[Validators.required, Validators.nullValidator]);

  courseForm = new FormGroup({
    nombre: this.formNombre,
    comision: this.formComision,
    profesor: this.formProfesor,
    estudiantes: this.formEstudiantes,
  });

  constructor(
    private dialogRef: MatDialogRef<RegisterCourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course | null
  ) {
    if (data) {
      this.courseForm.patchValue(data);
      console.log(data);
    }
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
