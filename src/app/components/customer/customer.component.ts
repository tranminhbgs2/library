import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Customer } from 'src/app/products';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'ma_customer', 'update', 'delete'];

  id: any;
  role_id: any;
  role: any;
  data: any;
  public dataSource = new MatTableDataSource<Customer>();
  isloadingresults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public form = {
    text: null,
  };
  protected error: [];
  constructor(
    private jarwis: JarwisService,
    private Token: TokenService,
    private auth: AuthService,
    private router: Router,
    private notify: SnotifyService
  ) { }

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
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSubmit() {
    // console.log(this.form);
  }
  // danh sách tất cả sản phẩm
  getall() {
    this.jarwis.getallCustomer()
    .subscribe(res => {
      this.data = res as Customer[];
      this.dataSource.data = this.data.data;
      // console.log(this.dataSource.data);
      this.isloadingresults = false;
    }, err => {
      err = this.handleError(err);
      this.isloadingresults = false;
    });

  }

  public redirectToUpdate(id) {
    this.jarwis.showdetail(id).subscribe(
      // data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  public redirectToDelete(id) {
    if (this.role_id === 1) {
    if (confirm('Bạn có chắc muốn xóa hay không?')) {
      this.notify.warning('Đang xóa dữ liệu');
      this.jarwis.deleteUser(id).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
    // console.log('hi');
  } else {
    this.notify.warning('Cảnh báo bạn không được phép truy cập vào');
    this.router.navigateByUrl('/customers');
  }
  }
  // Tìm kiếm
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    if (this.dataSource.filteredData.length === 0) {
      this.notify.info('Không có dữ liệu cần tìm');
    }
  }
  // dữ liệu trả về và thông báo
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
