import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userEmail: string = '';
  tasks?: any[];

  constructor(
    private auth: AuthService,
    private platformLocation: PlatformLocation,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    //back-track prevention
    history.pushState(null, '', location.href);
    this.platformLocation.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  ngOnInit(): void {
    //getting welcome message
    this.userEmail = this.auth.getUserEmail();

    //getting user data on basis of email
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore
          .collection('/Students', (ref) =>
            ref.where('EmailId', '==', user.email)
          )
          .valueChanges()
          .subscribe((tasks) => {
            this.tasks = tasks;
          });
      }
    });
  }

  //logout
  logoff() {
    this.auth.logout();
  }
}
