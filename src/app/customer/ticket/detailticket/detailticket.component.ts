import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
import { SnotifyService } from 'ng-snotify';
import { Category } from 'src/app/products';

@Component({
  selector: 'app-detailticket',
  templateUrl: './detailticket.component.html',
  styleUrls: ['./detailticket.component.css']
})
export class DetailticketComponent implements OnInit {

  id: any;
  data: any;
  public ticket = {
    code: null,
    date_active: null,
    date_back: null,
    id: null,
    name_user: null,
    product_id: null,
    status_detail: null,
    status: null
  };
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
    content: null,
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
      this.id = data['code'];
      this.jarwis.showTicket(this.id).subscribe(
        res => {
          data = res;
          this.ticket = data.data;
          // console.log(this.ticket);
          // console.log(this.ticket.product_id);
          this.getBook();
        }
      );
    });
    this.getCate();
  }
  // Thông tin sách
  getBook() {
    this.jarwis.ProTicket(this.ticket.product_id).subscribe(
      res => {
        this.data = res;
        this.form = this.data.data;
      }
    );
  }
  // danh mục sách
  getCate() {
    this.jarwis.getallCa().subscribe(
      res => {
        this.listcate = res;
        this.category = this.listcate.data;
        // console.log(this.category);
      }
    );
  }
}
