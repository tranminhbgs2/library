import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent implements OnInit {
  id: any;
  data: any;
  role: any;
  imgUrrl: string = 'assets/images/gallery/chair3.jpg';
  form: FormGroup;
  category: [];
  selectFile: File = null;
  protected error = [];
  constructor(
    private jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private auth: AuthService,
    private notify: SnotifyService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.maxLength(10)]],
      size: ['', [Validators.required, Validators.maxLength(15)]],
      weight: ['', [Validators.required]],
      description: [''],
      // img: ['', [Validators.required]],
      author: ['', [Validators.required]],
      company: ['', [Validators.required]],
      pushlisher: ['', [Validators.required]],
      translator: [''],
      category_id: ['', [Validators.required]],
      content: [''],
      // role_id: [''],
    });
    this.jarwis.getallCa().subscribe(
      res => {
        this.data = res;
        this.category = this.data.data;
        // console.log(this.category);
      }
    );
    // this.id = this.Token.get();
    // // console.log(this.id);
    // if (this.id) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer' + this.id
    //   })
    // };
    // this.jarwis.role(httpOptions).subscribe(
    //   res => {
    //     this.role = res;
    //     this.form.controls['role_id'] = this.role.role_id;
    //   },
    //   error => this.handleError(error)
    // );
    // }
  }

  fileSelect(file: FileList) {
    this.selectFile = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrrl = event.target.result;
    };
    reader.readAsDataURL(this.selectFile);
  }
  addProduct() {
  let myFormData = new FormData();
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  myFormData.append('image', this.selectFile);
  myFormData.append('name', this.form.controls['name'].value);
  myFormData.append('size', this.form.controls['size'].value);
  myFormData.append('weight', this.form.controls['weight'].value);
  myFormData.append('description', this.form.controls['description'].value);
  myFormData.append('price', this.form.controls['price'].value);
  myFormData.append('author', this.form.controls['author'].value);
  myFormData.append('pushlisher', this.form.controls['pushlisher'].value);
  myFormData.append('translator', this.form.controls['translator'].value);
  myFormData.append('contents', this.form.controls['content'].value);
  myFormData.append('category_id', this.form.controls['category_id'].value);
  myFormData.append('company', this.form.controls['company'].value);
  // myFormData.append('role_id', this.form.controls['role_id'].value);
  // console.log(this.form);
  this.notify.info('Đang thêm sách...');
  this.jarwis.addProduct(myFormData,
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
    this.router.navigateByUrl('/product');
  }
  // Message Error
  handleError(error) {
    this.error = error.error.errors;
  }
}
