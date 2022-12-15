import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent implements OnInit {
  formNombres = new FormControl('',[Validators.required, Validators.nullValidator]);
  formApellidos = new FormControl('',[Validators.required, Validators.nullValidator]);
  formCorreo = new FormControl('',[Validators.required, , Validators.nullValidator, Validators.email]);
  formComision = new FormControl('',[Validators.required, Validators.nullValidator]);
  formCurso = new FormControl('',[Validators.required, Validators.nullValidator]);
  formTelefono = new FormControl('',[Validators.required, Validators.nullValidator]);

  studentForm = new FormGroup({
    nombres: this.formNombres,
    apellidos: this.formApellidos,
    correo: this.formCorreo,
    comision: this.formComision,
    curso: this.formCurso,
    telefono: this.formTelefono,
  });

  constructor(
    private dialogRef: MatDialogRef<RegisterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student | null
  ) {
    if (data) {
      this.studentForm.patchValue(data);
    }
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
