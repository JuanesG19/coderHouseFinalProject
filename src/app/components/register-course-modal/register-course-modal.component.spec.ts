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

import { RegisterCourseModalComponent } from './register-course-modal.component';

describe('RegisterCourseModalComponent', () => {
  let component: RegisterCourseModalComponent;
  let fixture: ComponentFixture<RegisterCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterCourseModalComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Pruebas Personalizadas */

  /* El formulario retorna invalido cuando solo se agrega un campo */
  it('The form return invalid', () => {
    fixture = TestBed.createComponent(RegisterCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.courseForm;
    const name = form.controls['nombre'];

    name.setValue('Testing');
    expect(form.invalid).toBeTrue;
  });

  /* El formulario retorna valido */
  it('The form return valid', () => {
    fixture = TestBed.createComponent(RegisterCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.courseForm;
    const nombre = form.controls['nombre'];
    const comision = form.controls['comision'];
    const profesor = form.controls['profesor'];

    nombre.setValue('Testing');
    comision.setValue('Testing');
    profesor.setValue('Testing');

    expect(form.invalid).toBeTrue;
  });
});
