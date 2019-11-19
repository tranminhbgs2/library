import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  id: any;
  data: any;
  imgUrl: string = 'assets/images/gallery/chair3.jpg';
  category: [];
  message: any;
  selectFile: File = null;
  public form = {
    name: null,
    price: null,
    size: null,
    weight: null,
    description: null,
    img: null,
    author: null,
    company: null,
    pushlisher: null,
    translator: null,
    categories_id: null,
    contents: null,
  };
  protected error = [];
  constructor(
    private jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private notify: SnotifyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      // console.log(this.id);
      this.jarwis.showdetail(this.id).subscribe(
        (res: []) => {
          data = res;
          this.form = data.data;
          this.imgUrl = this.form.img;
          console.log(this.form);
        }
      );
    });
    this.jarwis.getallCa().subscribe(
      res => {
        this.data = res;
        this.category = this.data.data;
        // console.log(this.category);
      }
    );
  }
  fileSelect(file: FileList) {
    this.selectFile = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    };
    reader.readAsDataURL(this.selectFile);
    let fileupload = new FormData();
    fileupload.append('img', this.selectFile);
    this.jarwis.upfile(this.id, fileupload).subscribe(
      res => {
        this.message = res;
        this.notify.success(this.message.message);
      }
    );
    // console.log(this.form);
  }
  editProduct() {
    console.log(this.form);
  this.jarwis.editPro(this.id, this.form
  ).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.Token.isValid();
    // console.log(data.access_token);
    this.auth.changeAuthStatus(true);
    this.notify.success('Chỉnh sửa thành công');
    this.router.navigateByUrl('/product');
  }
  // Message Error
  handleError(error) {
    this.error = error.error.errors;
  }
}
