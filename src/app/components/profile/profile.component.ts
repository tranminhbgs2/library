import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { HttpHeaders } from '@angular/common/http';
import { JarwisService } from 'src/app/Services/jarwis.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private token: TokenService,
    private jarwis: JarwisService
  ) { }

  id: any;
  ngOnInit() {
    this.id = this.token.get();
    // console.log(this.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer' + this.id
      })
    };
    this.jarwis.profile(httpOptions).subscribe(
      res => console.log(res)
    );
  }
}
