import { Component } from '@angular/core';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  constructor(private auth: AuthService) {}

  //Forget-password
  forgotpass() {
    this.auth.forgotpassword(this.email);
    this.email = '';
  }
}
