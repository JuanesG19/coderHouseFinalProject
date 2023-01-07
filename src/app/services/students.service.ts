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
      cursos: student.cursos,
      correo: student.correo,
      telefono: student.telefono,
      pais: student.pais,
    });
  }

  deleteStudent(student) {
    return this.firestore.collection('students').doc(student.id).delete();
  }

  deleteStudentsCourse(id, comision) {
    var student;
    var courses;

    this.getStudentById(id).subscribe((res) => {
      student = res as Student;
      courses = student['cursos'];
      courses = courses.filter((cursos) => cursos.comision != comision);
      return this.firestore.collection('students').doc(id).update({
        cursos: courses,
      });
    });
  }

  addStudentsCourse(id, newCourse) {
    return this.firestore.collection('students').doc(id).update({
      cursos: newCourse,
    });
  }
}
