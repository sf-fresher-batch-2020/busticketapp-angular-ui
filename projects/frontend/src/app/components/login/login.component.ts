import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
 
  constructor(private authService: AuthService, private userService: UserService, private toastr: ToastrService,
    private router: Router) {

  }

  ngOnInit(): void {

  }

  login(form: NgForm) {
    this.userService.getAllUsers().subscribe(res => {

      console.log(res);
      let users: any = res;
      let userExists = false;
      let loggedInUser = null;
      for (let obj of users) {
        if (obj.email == this.email && obj.password == this.password ) {
          userExists = true;
         // delete obj["password"];
          loggedInUser = obj;
          break;
        }
      }
      if (userExists) {
        form.reset();
        this.toastr.success("Successfully Login")
        this.authService.storeLoginDetails(loggedInUser);
        if (loggedInUser.role == "ADMIN") {
          window.location.href="add-bus";

        }
        else {
          window.location.href = "search-buses";

        }

      }
      else {
        this.toastr.error("Invalid Credentials");
      }
    });


  }

}
