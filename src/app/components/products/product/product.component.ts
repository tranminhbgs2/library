import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products';
import { SnotifyService } from 'ng-snotify';
import { LoginComponent } from '../../login/login.component';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'img', 'name', 'discount', 'total_price', 'rating', 'update', 'delete'];
  data: any;
  id: any;
  role: any;
  role_id: any;
  public dataSource = new MatTableDataSource<Product>();
  isloadingresults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  protected error: [];
  constructor(
    private jarwis: JarwisService,
    private Token: TokenService,
    private auth: AuthService,
    private router: Router,
    private notify: SnotifyService,
  ) {}
  ngOnInit() {
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
        if (this.role_id === 1) {
          this.getall();
        } else {
          this.router.navigateByUrl('/customers');
        }
      },
      error => this.handleError(error)
    );
    }
    // this.getall();
    // console.log(this.data);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // danh sách tất cả sản phẩm
  getall() {
    this.jarwis.getallPro()
    .subscribe(res => {
      this.data = res as Product[];
      this.dataSource.data = this.data.data;
      // console.log(this.dataSource.data);
      this.isloadingresults = false;
    }, err => {
      err = this.handleError(err);
      this.isloadingresults = false;
    });

  }
  // Cập nhập sản phẩm
  public redirectToUpdate(id) {
    this.jarwis.showdetail(id).subscribe(
      // data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  // Xóa sản phẩm
  public redirectToDelete(id) {
    if (confirm('Bạn có chắc muốn xóa hay không?')) {
      this.notify.warning('Đang xóa dữ liệu');
      this.jarwis.delete(id).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
  }
  // Tìm kiếm
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    if (this.dataSource.filteredData.length === 0) {
      this.notify.info('Không có dữ liệu cần tìm');
    }
  }
  // trả về dữ liệu
  handleResponse(data) {
    this.Token.isValid();
    // console.log(data.access_token);
    this.auth.changeAuthStatus(true);
    if (this.notify.success('Xóa thành công!!')) {
      this.getall();
    }
  }
  // Message Error
  handleError(err) {
    this.error = err.error.errors;
  }
}
