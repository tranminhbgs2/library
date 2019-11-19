import { Component, OnInit } from '@angular/core';
import { NotFoundService } from '../Services/not-found.service';
import { JarwisService } from '../Services/jarwis.service';
import { TokenService } from '../Services/token.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private nfService: NotFoundService,
    private Token: TokenService,
    private jarwis: JarwisService
  ) { }

  id: any;
  role: any;
  role_id: number;
  ngOnInit() {
    this.nfService.emit(true);
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
        console.log(this.role_id);
      }
    );
    }
  }
  ngOnDestroy(): void {
    this.nfService.emit(false);
  }

}
