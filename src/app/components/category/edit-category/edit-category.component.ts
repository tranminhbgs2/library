import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  slug: any;
  data: any;
  id: any;
  role: any;
  // role_id: any;
  public form = {
    title: null,
    role_id: null
  };
  protected error: [];
  constructor(
    private jarwis: JarwisService,
    private Token: TokenService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notify: SnotifyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (data) => {
        this.slug = data['slug'];
        // console.log(data);
        this.jarwis.showCate(this.slug).subscribe(
          res => {
            this.data = res;
            this.form = this.data.data;
            // console.log(this.form);
          }
        );
      }
    );
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
  editCate() {
    this.notify.info('Đang cập nhật danh mục', {timeout: 1500});
    this.jarwis.editCate(this.slug, this.form).subscribe(
      res => this.handleResponse(res),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.Token.isValid();
    // console.log(data.access_token);
    this.auth.changeAuthStatus(true);
    this.notify.success('Cập nhật thành công');
    this.router.navigateByUrl('/category');
  }
  // Message Error
  handleError(error) {
    this.error = error.error.errors;
  }
}
