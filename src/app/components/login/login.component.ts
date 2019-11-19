import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
import { SnotifyService } from 'ng-snotify';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: any;
  form: FormGroup;
  public error = null;
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private notify: SnotifyService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),
                      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?=.*[A-Za-z\d$@$!%*?&])/)
                     ]
                ],
    });
  }
  onSubmit() {
    // console.log(this.form);
    this.notify.info('Đang tải...', {timeout: 3000});
    this.Jarwis.login(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    // console.log(data);
    if (data.role_id === 1) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl(`/product`);
    this.notify.success( data.name, 'Xin chào', {timeout: 3000});
    } else {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl(`/customers`);
    this.notify.success( data.name, 'Xin chào', {timeout: 3000});
      // this.notify.warning('Bạn không có quyền đăng nhập', {timeout: 3000});
    }
  }
  // Message Error
  handleError(error) {
    this.error = error.error.error;
  }

}
