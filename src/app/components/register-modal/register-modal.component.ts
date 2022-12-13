import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent implements OnInit {
  formNombres = new FormControl();
  formApellidos = new FormControl();
  formCorreo = new FormControl();
  formPais = new FormControl();
  formTelefono = new FormControl();

  studentForm = new FormGroup({
    nombres: this.formNombres,
    apellidos: this.formApellidos,
    correo: this.formCorreo,
    pais: this.formPais,
    telefono: this.formTelefono,
  });

  constructor(private dialogRef: MatDialogRef<RegisterModalComponent>) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
