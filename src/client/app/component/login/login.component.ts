import { Component, OnInit } from '@angular/core';
import { UserService, LoaderService } from '@ts-webapp/front';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private token: string;
  private loading = false;
  title = 'Log in';
  user: any;
  form = {
    username: 'a',
    password: 'a'
  };

  constructor(private userService: UserService, private loader: LoaderService) { }

  ngOnInit() {
    this.userService.check().subscribe(response => this.change(response));
  }
  change(response: any) {
    if (this.token === response.token) {
      return;
    }
    this.token = response.token;
    this.user = response.user;
  }
  login() {
    this.loading = true;
    this.loader.load('my login', () => this.loading = false);
    this.userService.login(this.form.username, this.form.password).subscribe(res => this.loader.unload('my login'));
  }
  logout() {
    this.loading = true;
    this.loader.load('my logout', () => this.loading = false);
    this.userService.logout().subscribe(res => this.loader.unload('my logout'));
  }
  register() {
    this.userService.register('a', 'a');
  }

}
