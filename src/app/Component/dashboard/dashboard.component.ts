import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/auth.service';
import { DataService } from 'src/app/Shared/data.service';
import { Student } from 'src/app/model/student';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userEmail: string = '';
  ngOnInit() {
    //to get welcome message
    this.userEmail = this.auth.getUserEmail();
    //to store the data in array
    this.getAllstudents();
  }

  studentList: Student[] = [];
  studentObj: Student = {
    id: '',
    EmailId: '',
    TaskName: '',
    Description: '',
  };
  id: string = '';
  EmailId: string = '';
  TaskName: string = '';
  Description: string = '';

  constructor(
    private auth: AuthService,
    private data: DataService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private platformLocation: PlatformLocation
  ) {
    //prevent back-track
    history.pushState(null, '', location.href);
    this.platformLocation.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  //logout
  logoff() {
    this.auth.logout();
  }

  //store the data in blank array
  getAllstudents() {
    this.data.getAllstudents().subscribe(
      (res:any) => {
        this.studentList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err:any) => {
        alert('error while fetching student data');
      }
    );
  }

  //add-data
  addstudent() {
    if (this.EmailId == '' || this.TaskName == '' || this.Description == '') {
      alert('fill all the fields');
      return;
    }
    this.studentObj.id = '';
    this.studentObj.EmailId = this.EmailId;
    this.studentObj.TaskName = this.TaskName;
    this.studentObj.Description = this.Description;

    this.data.addstudent(this.studentObj);
    this.id = '';
    this.EmailId = '';
    this.TaskName = '';
    this.Description = '';
  }

  //delete data
  delete(student: Student) {
    if (
      window.confirm(
        'Are You Sure You Want to Delete' +
          student.EmailId +
          ' ' +
          student.id +
          '?'
      )
    ) {
      this.data.deletestudent(student);
    }
  }
}
