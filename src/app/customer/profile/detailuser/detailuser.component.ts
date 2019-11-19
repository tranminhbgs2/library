import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { HttpHeaders } from '@angular/common/http';
import { Customer } from 'src/app/products';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css']
})
export class DetailuserComponent implements OnInit {

  id: any;
  data: any;
  imgurl: string = 'assets/images/users/user.png';
  user = {
    id: null,
    name: null,
    email: null,
    ma_customer: null,
    avatar: null,
    phone: null,
    gender: null,
    address: null,
    status: null,
    story: null,
  };
  form: FormGroup;
  form1: FormGroup;
  selectFile: File = null;
  error: any;
  slug: any;
  data1: any;
  imgUrl: any;
  message: any;
  constructor(
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private jarwis: JarwisService,
    private auth: AuthService,
    private token: TokenService,
    private notify: SnotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProfile();
    // console.log(this.user);
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      email_verified_at: [{value: ''}],
      ma_customer: [{value: '', disabled: true}, Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]+')]],
      gender: [''],
      avatar: [''],
      status: [''],
      story: [''],
      created_at: [''],
      updated_at: [''],
    });
    this.form1 = this.fb1.group({
      password_old: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?=.*[A-Za-z\d$@$!%*?&])/)
       ]
        ],
      password: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?=.*[A-Za-z\d$@$!%*?&])/)
       ]
        ],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
      },
      this.pwdMatchValidator
);
  }
  // so sánh mật khẩu
  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('password_confirmation').value
       ? null : {'mismatch': true};
 }
  get password() { return this.form1.get('password'); }
  get password_old() { return this.form1.get('password_old'); }
  get password_confirmation() { return this.form1.get('password_confirmation'); }
  // ĐỔi mật khẩu
  changepass() {
    this.jarwis.editCustomer(this.user.ma_customer, this.form1.value
    ).subscribe(
      data => {
        this.notify.success('Thay đổi mật khẩu thành công! Vui lòng đăng nhập lại', data);
        this.token.remove();
        this.auth.changeAuthStatus(false);
        this.router.navigateByUrl(`/`).then(
          () => {this.router.navigateByUrl(this.router.url); });
        this.router.navigateByUrl('/login');
      },
      error => this.error
      );
  }
  // Lấy thông tin user
  getProfile() {
    this.id = this.token.get();
    // console.log(this.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer' + this.id
      })
    };
    this.jarwis.profile(httpOptions).subscribe(
      res => {
        this.data = res;
        this.user = this.data;
        this.data1 = this.form.setValue(this.user);
        console.log(this.user);
      }
    );
  }
  // sửa ảnh
  fileSelect(file: FileList) {
    this.selectFile = file.item(0);
    console.log(this.selectFile);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
      // console.log(this.imgUrl);
    };
    reader.readAsDataURL(this.selectFile);
    let fileupload = new FormData();
    fileupload.append('avatar', this.selectFile);
    this.jarwis.upfileUser(this.user.ma_customer, fileupload).subscribe(
      res => {
        this.message = res;
        this.getProfile();
        this.notify.success(this.message.message);
      }
    );
    // console.log(this.form);
  }
  // Sửa thông tin
  editCustomer() {
  // console.log(this.user.ma_customer);
  this.jarwis.editCustomer(this.user.ma_customer, this.form.value
  ).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
    );
  }
  // Khi sửa thành công
  handleResponse(data) {
    this.token.isValid();
    // console.log(data.access_token);
    this.auth.changeAuthStatus(true);
    if (this.notify.success('Cập nhật thành công', 'User ' + this.form.controls['name'].value)) {
        this.getProfile();
    }
    this.router.navigateByUrl('/customers/profile');
  }
  // Thông báo lỗi
  // Message Error
  handleError(error) {
    console.log(error);
    this.error = error.error.errors;
  }
}
