import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;
  submitted: boolean = false;

  constructor(public userService: UsersService, public toast: ToastrService,public router: Router) {
    this.username = "";
    this.password = "";
    this.errorMessage = "";
  }

  ngOnInit() {
  }

  onLogin() {
    this.userService.login(this.username, this.password).subscribe(
      result => {
        if (result.data.access_token) {
          console.log(this.userService.getJWTValue());
          this.router.navigate(['/dashboard']);          
          this.toast.success("Tizimga hush kelibsiz!", "Ajoyib");
        } else {
          this.toast.success("Login yoki parol noto'g'ri", "Xatolik");
          this.submitted = false;          
        }
      },
      err => this.toast.error("Login yoki parol noto'g'ri", "Xatolik"),
      () => console.log('yay')
    );
  }

}
