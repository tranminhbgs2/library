import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  form1: FormGroup;
  token: any;
  protected form = {
    email: null,
    resetToken: null,
    password: null,
    password_confirmation: null,
  };
  public error = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private Jarwis: JarwisService,
    private router: Router,
    private Notify: SnotifyService,
  ) {
    route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
   }

  ngOnInit() {
    this.form1 = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      resetToken: [''],
      password: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?=.*[A-Za-z\d$@$!%*?&])/)
       ]
        ],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
      },
      this.pwdMatchValidator
);
this.form1.patchValue({
  resetToken: this.token
});
  }
// so sánh mật khẩu
  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('password_confirmation').value
      ? null : {'mismatch': true};
  }
  get password() { return this.form1.get('password'); }
  get password_confirmation() { return this.form1.get('password_confirmation'); }
  onSubmit() {
    this.Jarwis.changePassword(this.form1.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
    );
  }

  handleResponse(data) {

    let _router = this.router;
    this.Notify.confirm('Thành công! Bây giờ bạn có thể đăng nhập bằng mật khẩu mới!', {
      buttons: [
        {
          text: 'Đồng ý',
          action: toster => {
            _router.navigateByUrl('/login'),
            this.Notify.remove(toster.id);
          }
        }
      ]
    });
  }
  handleError(error) {
    this.error = error.error.errors;
  }
}
