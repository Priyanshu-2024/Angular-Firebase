import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private userEmailKey = 'userEmail';
  constructor(private fireauth: AngularFireAuth, private router: Router) {}
  //login
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'token');

        if (res.user?.emailVerified) {
          if (email === 'priyanshupatel2313@gmail.com') {
            this.router.navigate(['/dashboard']);
            localStorage.setItem(this.userEmailKey, email);
            localStorage.setItem('token', 'true');
            this.isAuthenticated = true;
          } else {
            this.router.navigate(['/user']);
            this.isAuthenticated = true;
            localStorage.setItem(this.userEmailKey, email);
            localStorage.setItem('token', 'true');
          }
        } else {
          alert('Please Verify Your Email');
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        alert('something went wrong');
        this.router.navigate(['/login']);
      }
    );
  }
  //register
  register(email: string, password: string) {
    localStorage.setItem(this.userEmailKey, email);
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration Successful');
        this.router.navigate(['/login']);
        this.SendVerficationEmail(res.user);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }
  //logout
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  //forgot
  forgotpassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert('something went wrong ');
      }
    );
  }
  //verificatio mail while signup
  SendVerficationEmail(user: any) {
    this.fireauth.currentUser
      .then((u) => u?.sendEmailVerification())
      .then(
        (res: any) => {
          // this.router.navigate(['/verify-email']);
        },
        (err: any) => {
          alert(
            'Something Went Wrong. Not able to send mail to registered Email.'
          );
        }
      );
  }
  //signup with google
  googlesignin() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.fireauth.signInWithPopup(provider).then(
      (res) => {
        const userEmail = res.user?.email; // Access the user's email
        if (userEmail) {
          if (userEmail == 'priyanshupatel2313@gmail.com') {
            this.router.navigate(['/dashboard']);
            localStorage.setItem(this.userEmailKey, userEmail);
            localStorage.setItem('token', 'true');
            this.isAuthenticated = true;
          } else {
            this.router.navigate(['/user']);
            localStorage.setItem(this.userEmailKey, userEmail);
            localStorage.setItem('token', 'true');

            this.isAuthenticated = true;
          }
        } else {
          alert('Please Verify Your Email');
          // this.router.navigate(['/login']);
        }
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
        // this.router.navigate(['/dashboard']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  //welcome message
  getUserEmail(): string {
    return localStorage.getItem(this.userEmailKey) || ''; // Retrieve user's email from localStorage
  }
  //auth-guard
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
