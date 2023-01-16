import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private firestore: AngularFirestore) {}

  getCourses() {
    return this.firestore.collection('courses').snapshotChanges();
  }

  getCourseById(id) {
    return this.firestore.collection('courses').doc(id).valueChanges();
  }

  createCourse(course) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('courses')
        .add(course)
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

  updateCourse(course: Course, id) {
    return this.firestore.collection('courses').doc(id).update({
      nombre: course.nombre,
      comision: course.comision,
      profesor: course.profesor,
    });
  }

  deleteCourse(course) {
    return this.firestore.collection('courses').doc(course.id).delete();
  }

   updateStudents(id, students) {
    return this.firestore
      .collection('courses')
      .doc(id)
      .update({ estudiantes: students });
  }
}
