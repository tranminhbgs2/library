import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Ticket } from 'src/app/products';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-listticket',
  templateUrl: './listticket.component.html',
  styleUrls: ['./listticket.component.css']
})
export class ListticketComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'code', 'name_user', 'date_active', 'date_back', 'detail'];
  data: any;
  public dataSource = new MatTableDataSource<Ticket>();
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
    this.getall();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // thông tin phiếu mượn
  getall() {
    this.jarwis.listTicket()
    .subscribe(res => {
      this.data = res as Ticket[];
      this.dataSource.data = this.data.data;
      // console.log(this.dataSource.data);
      this.isloadingresults = false;
    }, err => {
      err = this.handleError(err);
      this.isloadingresults = false;
    });

  }
  // Tìm kiếm
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    if (this.dataSource.filteredData.length === 0) {
      this.notify.info('Không có dữ liệu cần tìm');
    }
  }
  // khi lấy thông tin thành công
  handleResponse(data) {
    this.Token.isValid();
    // console.log(data.access_token);
    this.auth.changeAuthStatus(true);
    // if (this.notify.success('Xóa thành công!!')) {
    //   this.getall();
    // }
  }
  // Message Error
  handleError(err) {
    this.error = err.error.errors;
    // console.log(this.error);
  }
}
