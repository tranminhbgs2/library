import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { ActivatedRoute } from '@angular/router';
import { Product, Category } from 'src/app/products';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
import { SnotifyService } from 'ng-snotify';

declare var $: any;
declare var require: any;
@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {

  id: any;
  id_user: any;
  user: any;
  error: [];
  data: any;
  data1: any;
  book: any[];
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
    category_id: null,
    contents: null,
    rating: null
  };
  public category: Category[];
  listcate: any;
  constructor(
    private jarwis: JarwisService,
    private route: ActivatedRoute,
    private Token: TokenService,
    private auth: AuthService,
    private notify: SnotifyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.id = data['slug'];
      this.jarwis.showdetail(this.id).subscribe(
        res => {
          data = res;
          this.form = data.data;
          console.log(this.form);
        }
      );
      this.jarwis.getBooksame(this.id).subscribe(
        cate =>
        {
          this.data1 = cate as Product[];
          this.book = this.data1.data;
          console.log(this.book);
        }
      )
    });
    // console.log(this.form.category_id);
    this.getUser();
    this.getCate();
  }
  getUser() {
    this.id_user = this.Token.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer' + this.id_user
      })
    };
    // console.log(httpOptions);
    this.jarwis.profile(httpOptions).subscribe(
      res => {
        this.user = res;
      }
    );
  }
  getCate() {
    this.jarwis.getallCa().subscribe(
      res => {
        this.listcate = res;
        this.category = this.listcate.data;
        // console.log(this.category);
      }
    );
  }
  ticket(id) {
    if (confirm('Bạn có chắc muốn mượn sách này hay không?')) {
      this.notify.warning('Đang tạo phiếu mượn');
      this.data = {
        product_id: id,
        user_id: this.user.id
      };
      this.jarwis.createTicket(this.data).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    // console.log(this.user.id);
    }
  }
  // trả về dữ liệu
  handleResponse(data) {
    this.Token.isValid();
    console.log(data);
    this.auth.changeAuthStatus(true);
    this.notify.success(data.success);
    // if (this.notify.success('Xóa thành công!!')) {
    //   this.getall();
    // }
  }
  // Message Error
  handleError(err) {
    this.error = err.error.errors;
  }
}

