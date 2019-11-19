import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  form: FormGroup;
  imgUrl: string = 'assets/images/users/user.png';
  selectFile: File = null;
  error: [];
  constructor(
    private fb: FormBuilder,
    private jarwis: JarwisService,
    private auth: AuthService,
    private Token: TokenService,
    private notify: SnotifyService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),
                      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?=.*[A-Za-z\d$@$!%*?&])/)
                     ]
                ],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      gender: ['Nam'],
      avatar: [''],
    });
  }
  fileSelect(file: FileList) {
    this.selectFile = file.item(0);
    // console.log(this.fileSelect);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    };
    if (this.imgUrl == null) {
        this.imgUrl = 'assets/images/users/user.png';
    }
    // console.log(this.imgUrl);
    reader.readAsDataURL(this.selectFile);
  }
  addCustomer() {
  let myFormData = new FormData();
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  myFormData.append('avatar', this.selectFile);
  myFormData.append('name', this.form.controls['name'].value);
  myFormData.append('email', this.form.controls['email'].value);
  myFormData.append('password', this.form.controls['password'].value);
  myFormData.append('phone', this.form.controls['phone'].value);
  myFormData.append('address', this.form.controls['address'].value);
  myFormData.append('gender', this.form.controls['gender'].value);
  // console.log(this.form.value);
  this.jarwis.addCustomer(myFormData
  ).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.isValid();
    // console.log(data.access_token);
    this.auth.changeAuthStatus(true);
    this.notify.success('Thêm thành công');
    this.router.navigateByUrl('/customer');
  }
  // Message Error
  handleError(error) {
    this.error = error.error.errors;
  }

}
