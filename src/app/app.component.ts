import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from './models/User';
import {LoginService} from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Securety';
  show: string[] = [];
  users: User[] = [];
  showUsers;
  showHello: boolean;
  helloUser: User = new User(null, '', '', '');


  constructor(
    private loginService: LoginService
  ) {

  }

  ngOnInit(): void {
    if (this.users.length !== 0) {
      this.showUsers = true;
    } else {
      this.showUsers = false;
    }
  }

  boRegedit(form: NgForm) {
    if (form.valid && form.touched) {
      const user = new User();
      user.username = form.value.username;
      user.password = form.value.password;
      user.email = form.value.email;
      this.loginService.regeditNewUser(user);
      form.resetForm();
      setTimeout(() => this.ngOnInit(), 500); // This must be error
    }
  }

  boLogin(form: NgForm) {
    if (form.valid && form.touched) {
      this.loginService.login(new User(null, form.value.username, form.value.password, null));
      form.resetForm();
      this.loginService.getAllUsers().subscribe(value => this.users = value);
      setTimeout(() => this.ngOnInit(), 500);
    }
  }

  deleteUserofList(email: string) {
    this.users.splice(this.users.findIndex(value => value.email === email), 1);
    this.ngOnInit();
  }

  closeHello() {
    this.showHello = false;
  }
}




