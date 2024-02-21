import { Component } from '@angular/core';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private auth: AuthService) {}

  //login
  login() {
    if (this.email == '') {
      alert('please enter email');
      return;
    }
    if (this.password == '') {
      alert('please enter password');
      return;
    }
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  //sign in with google
  signInWithGoogle() {
    this.auth.googlesignin();
  }
}
