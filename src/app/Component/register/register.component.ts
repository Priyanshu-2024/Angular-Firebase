import { Component } from '@angular/core';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  constructor(private auth: AuthService) {}

  //register
  register() {
    if (this.email == '') {
      alert('please enter email');
      return;
    }
    if (this.password == '') {
      alert('please enter password');
      return;
    }
    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  //sign up with google
  signInWithGoogle() {
    this.auth.googlesignin();
  }
}
