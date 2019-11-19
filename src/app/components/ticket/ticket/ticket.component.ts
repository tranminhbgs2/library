import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TicketDeatil } from 'src/app/products';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'code', 'name_book', 'name_user', 'date_active', 'date_back', 'status', 'back'];
  data: any;
  id: any;
  role: any;
  checked: [];
  role_id: any;
  errors: any;
  public ticketdetai = {
    status: null,
    product_status: null,
  };
  public dataSource = new MatTableDataSource<TicketDeatil>();
  isloadingresults = true;
  error: [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
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

  getall() {
    this.jarwis.listTicket_Detail()
    .subscribe(res => {
      this.data = res as TicketDeatil[];
      this.dataSource.data = this.data.data;
      // console.log(this.data);
      this.isloadingresults = false;
    }, err => {
      err = this.handleError(err);
      this.isloadingresults = false;
    }
    );

  }
  // Tìm kiếm
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    if (this.dataSource.filteredData.length === 0) {
      this.notify.info('Không có dữ liệu cần tìm');
    }
  }
  handleResponse(data) {
    this.Token.isValid();
    // console.log(data);
    this.auth.changeAuthStatus(true);
    if (data.status === 1) {
    if (this.notify.success('Phê duyệt phiếu mượn thành công!')) {
      this.getall();
    }
  } else if (data.status === 2) {
    if (this.notify.success('Trả sách thành công thành công!')) {
      this.getall();
    }
  } else {
    if (this.notify.success('Đã Bỏ Phê duyệt phiếu mượn thành công!')) {
      this.getall();
    }
  }
  }
  // Message Error
  handleError(err) {
    this.error = err.error.errors;
    console.log(this.error);
  }

  // trả sách
  givebook(status, id) {
    if (confirm('Bạn có chắc muốn trả sách hay không?')) {
      this.notify.warning('Đang thực hiện');
      if (status === 1) {
        this.ticketdetai.status = 2;
        this.jarwis.editTicket_Detail(id, this.ticketdetai).subscribe(
          res => this.handleResponse(res)
        );
      }
    }
  }
  // duyệt mượn sách
  changed(check, id) {

    // console.log(this.checked);
      if (check === true) {
        if (confirm('Bạn có chắc muốn duyệt phiếu mượn hay không?')) {
        this.notify.warning('Đang duyệt...');
        console.log(id, check);
        this.ticketdetai.status = 1;
        this.jarwis.editTicket_Detail(id, this.ticketdetai).subscribe(
          res => this.handleResponse(res)
        );
      }
    }
    else {
      if (check === false) {
        if (confirm('Bạn có chắc muốn hủy phiếu mượn hay không?')) {
          this.notify.warning('Đang hủy...');
          console.log(id, check);
          this.ticketdetai.status = 0;
          this.jarwis.editTicket_Detail(id, this.ticketdetai).subscribe(
            res => this.handleResponse(res)
          );
        }
      }
    }
    // console.log(this.checked);
  }
}
