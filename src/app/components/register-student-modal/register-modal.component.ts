import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent implements OnInit {
  courses: Course[] = [];

  formNombres = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  formApellidos = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  formCorreo = new FormControl('', [
    Validators.required,
    ,
    Validators.nullValidator,
    Validators.email,
  ]);
  formTelefono = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  studentForm = new FormGroup({
    nombres: this.formNombres,
    apellidos: this.formApellidos,
    correo: this.formCorreo,
    telefono: this.formTelefono,
  });

  private dialogData = null;

  constructor(
    @Optional() private dialogRef: MatDialogRef<RegisterModalComponent>,
    private injector: Injector,
    public coursesService: CoursesService
  ) {
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    this.dialogData;
    if (this.dialogData) {
      this.studentForm.patchValue(this.dialogData);
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
    return this.studentForm.get('studentForm');
  }

  get nombreCurso() {
    return this.studentForm.get('nombreCurso');
  }
}
