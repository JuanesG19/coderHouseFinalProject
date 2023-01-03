import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private firestore: AngularFirestore) {}

  getStudents() {
    return this.firestore.collection('students').snapshotChanges();
  }

  getStudentById(id) {
    return this.firestore.collection('students').doc(id).valueChanges();
  }

  createStudent(student) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('students')
        .add(student)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  updateStudent(student: Student, id) {
    return this.firestore.collection('students').doc(id).update({
      nombres: student.nombres,
      apellidos: student.apellidos,
      correo: student.correo,
      comision: student.comision,
      nombreCurso: student.nombreCurso,
      telefono: student.telefono,
    });
  }

  deleteStudent(student) {
    return this.firestore.collection('students').doc(student.id).delete();
  }
}
