import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  form: FormGroup;
  selectFile: File = null;
  error: [];
  slug: any;
  data: any;
  data1: any;
  imgUrl: string = 'assets/images/users/user.png';
  message: any;
  constructor(
    private fb: FormBuilder,
    private jarwis: JarwisService,
    private auth: AuthService,
    private Token: TokenService,
    private notify: SnotifyService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getUser();
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      ma_customer: [{value: '', disabled: true}, Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      gender: [''],
      avatar: [''],
      status: [''],
      story: ['']
    });
  }
  // Lấy thông tin user
  getUser() {
    this.route.params.subscribe(
      (data) => {
        this.slug = data['id'];
        this.jarwis.showCustomer(this.slug).subscribe(
          res => {
            if (res) {
            this.data = res;
            this.data1 = this.form.setValue(this.data.data);
            // console.log(this.data);
            } else {
              this.router.navigateByUrl('/not-found');
            }
          }
        );
      }
    );
  }
  fileSelect(file: FileList) {
    this.selectFile = file.item(0);
    // console.log(this.selectFile);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
      // console.log(this.imgUrl);
    };
    reader.readAsDataURL(this.selectFile);
    let fileupload = new FormData();
    fileupload.append('avatar', this.selectFile);
    this.jarwis.upfileUser(this.slug, fileupload).subscribe(
      res => {
        this.message = res;
        this.getUser();
        this.notify.success(this.message.message);
      }
    );
    // console.log(this.form);
  }
  editCustomer() {
    // console.log(this.form.value);
    this.jarwis.editCustomer(this.slug, this.form.value
    ).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
    }

    handleResponse(data) {
      this.Token.isValid();
      // console.log(data.access_token);
      this.auth.changeAuthStatus(true);
      this.notify.success('Cập nhật thành công', 'User ' + this.form.controls['name'].value);
      this.router.navigateByUrl('/customer');
    }
    // Message Error
    handleError(error) {
      this.error = error.error.errors;
    }
}
