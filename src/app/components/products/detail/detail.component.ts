import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: any;
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
    contents: null,
    rating: null
  };
  constructor(
    private jarwis: JarwisService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.jarwis.showdetail(this.id).subscribe(
        res => {
          data = res;
          this.form = data.data;
          console.log(this.form);
        }
      );
    });
  }

}
