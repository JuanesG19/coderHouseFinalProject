import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
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
  formNombre = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  formComision = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  formProfesor = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  courseForm = new FormGroup({
    nombre: this.formNombre,
    comision: this.formComision,
    profesor: this.formProfesor,
  });

  private dialogData = null;
  constructor(
    @Optional() private dialogRef: MatDialogRef<RegisterCourseModalComponent>,
    private injector: Injector
  ) {
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);

    if (this.dialogData) {
      this.courseForm.patchValue(this.dialogData);
    }
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
