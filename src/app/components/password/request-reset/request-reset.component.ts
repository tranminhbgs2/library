import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';
import { timeout } from 'q';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email : null,
  };
  constructor(
    private Jarwis: JarwisService,
    private notify: SnotifyService,
    private Notify: SnotifyService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.Notify.info('Đang tải...', {timeout: 3000});
    this.Jarwis.SendPasswordReset(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(res) {
    this.Notify.success(res.data, {timeout: 0});
    this.form.email = null;
  }
}
