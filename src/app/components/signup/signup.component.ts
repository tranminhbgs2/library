import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  public error: any;
  constructor(
    private fb: FormBuilder,
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private notify: SnotifyService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),
                      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?=.*[A-Za-z\d$@$!%*?&])/)
                     ]
                ],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
    },
    this.pwdMatchValidator
    );
  }
  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('password_confirmation').value
       ? null : {'mismatch': true};
 }

  get password() { return this.form.get('password'); }
  get password_confirmation() { return this.form.get('password_confirmation'); }
  onSubmit() {
    console.log(this.form);
    this.notify.info('Đang thực hiện...');
    this.Jarwis.signup(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
    );
  }

  handleResponse(data) {
    // this.Token.handle(data.access_token);
    this.notify.success('Đăng ký thành công! Vui lòng đăng nhập!');
    this.router.navigateByUrl('/login');
  }
  // Message Error
  handleError(error) {
    console.log(error);
    this.error = error.error.errors;
  }

}
