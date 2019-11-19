import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailticketComponent } from './detailticket.component';

describe('DetailticketComponent', () => {
  let component: DetailticketComponent;
  let fixture: ComponentFixture<DetailticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
