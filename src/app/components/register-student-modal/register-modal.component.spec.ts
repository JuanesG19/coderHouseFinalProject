import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { RegisterModalComponent } from './register-modal.component';

describe('RegisterModalComponent', () => {
  let component: RegisterModalComponent;
  let fixture: ComponentFixture<RegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterModalComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Pruebas Personalizadas */

  /* El formulario retorna invalido cuando solo se agrega un campo */
  it('The form return invalid', () => {
    fixture = TestBed.createComponent(RegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.studentForm;
    const name = form.controls['nombres'];
    name.setValue('Testing');
    expect(form.invalid).toBeTrue;
  });

  /* El formulario retorna valido */
  it('The form return valid', () => {
    fixture = TestBed.createComponent(RegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.studentForm;
    const nombres = form.controls['nombres'];
    const apellidos = form.controls['apellidos'];
    const correo = form.controls['correo'];
    const telefono = form.controls['telefono'];
    const pais = form.controls['pais'];

    nombres.setValue('Testing');
    apellidos.setValue('Testing');
    correo.setValue('Testing');
    telefono.setValue('Testing');
    pais.setValue('Testing');

    expect(form.invalid).toBeTrue;
  });
});
