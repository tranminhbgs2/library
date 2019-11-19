import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { Product } from 'src/app/products';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  data: any;
  book: any[];
  error: [];
  result: number;
  searchText;
  constructor(
    private jarwis: JarwisService,
    private Token: TokenService,
    private auth: AuthService,
    private router: Router,
    private notify: SnotifyService,
  ) {
  }

  ngOnInit() {
    this.getall();
  }

  getall() {
    this.jarwis.getallPro()
    .subscribe(res => {
      this.data = res as Product[];
      // this.dataSource.data = this.data.data;
      this.book = this.data.data;
      // console.log(this.book);
      this.result = this.book.length;
      // this.isloadingresults = false;
    }, err => {
      err = this.handleError(err);
      // this.isloadingresults = false;
    });

  }
  handleResponse(data) {
    this.Token.isValid();
    // console.log(data.access_token);
    this.auth.changeAuthStatus(true);
  }
  // Message Error
  handleError(err) {
    this.error = err;
    // console.log(this.error);
  }
}
