import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Student } from '../model/student';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}
  // add student
  addstudent(student: Student) {
    student.id = this.afs.createId();
    return this.afs.collection('/Students').add(student);
  }

  //get all students
  getAllstudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }
  //delete student
  deletestudent(student: Student) {
    return this.afs.doc('/Students/' + student.id).delete();
  }

  //update
  updatestudent(student: Student) {
    this.deletestudent(student);
    this.addstudent(student);
  }
}
