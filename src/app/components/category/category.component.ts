import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Category } from 'src/app/products';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'status', 'update', 'delete'];
  data: any;
  id: any;
  role: any;
  role_id: any;
  public dataSource = new MatTableDataSource<Category>();
  isloadingresults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  protected error: [];
  constructor(
    private jarwis: JarwisService,
    private Token: TokenService,
    private auth: AuthService,
    private router: Router,
    private notify: SnotifyService
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

    // console.log(this.data);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // danh sách tất cả sản phẩm
  getall() {
    this.jarwis.getallCa()
    .subscribe(res => {
      this.data = res as Category[];
      this.dataSource.data = this.data.data;
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
      this.jarwis.delete_cate(id).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
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
  handleResponse(data) {
    console.log(data);
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
