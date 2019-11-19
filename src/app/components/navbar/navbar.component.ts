import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { HttpHeaders } from '@angular/common/http';
import { JarwisService } from 'src/app/Services/jarwis.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  protected loggedIn: boolean;
  show: boolean;
  id: any;
  role: any;
  role_id: number;
  error: any;
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    private jarwis: JarwisService
  ) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.getrole();
  }

  getrole() {
    this.id = this.Token.get();
    // console.log(this.id);
    if (this.id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer' + this.id
      })
    };
    this.jarwis.role(httpOptions).subscribe(
      res => {
        this.role = res;
        this.role_id = this.role.role_id;
      },
      error => this.handleError(error)
    );
    }
  }
  handleError(err) {
    this.error = err.status;
    // console.log(this.error);
    if (this.error === 200 ) {
      // console.log(this.error);
      } else {
        this.Token.remove();
        this.Auth.changeAuthStatus(false);
        this.router.navigateByUrl(`/`).then(
          () => {this.router.navigateByUrl(this.router.url); });
        this.router.navigateByUrl('/login');
      }
  }
  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }
  showhide() {
    if (this.show === true) {
      this.show = false;
    }
    else {
      this.show = true;
    }
    console.log(this.show);
  }
}
