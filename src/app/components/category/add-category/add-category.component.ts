import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { SnotifyService } from 'ng-snotify';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  id: any;
  role: any;
  public form = {
    title: null,
    role_id: null
  };
  protected error: [];
  constructor(
    private jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private auth: AuthService,
    private notify: SnotifyService
  ) { }

  ngOnInit() {
    this.getrole();
  }

  getrole() {
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
        this.form.role_id = this.role.role_id;
      },
      error => this.handleError(error)
    );
    }
  }
  addCate() {
    this.notify.info('Đang thêm danh mục', {timeout: 1500});
    this.jarwis.addCategory(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.isValid();
    // console.log(data.access_token);
    this.auth.changeAuthStatus(true);
    this.notify.success('Thêm thành công');
    this.router.navigateByUrl('/category');
  }
  // Message Error
  handleError(error) {
    this.error = error.error.errors;
  }
}
