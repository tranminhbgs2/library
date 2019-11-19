import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule,
  MatButtonModule, MatPaginatorModule, MatTableDataSource, MatTableModule,
  MatSortModule, MatInputModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatSlideToggleModule } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { JarwisService } from './Services/jarwis.service';
import { TokenService} from './Services/token.service';
import { AuthService } from './Services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AddProductComponent } from './components/products/addproduct/addproduct.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './components/products/product/product.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EditproductComponent } from './components/products/editproduct/editproduct.component';
import { DetailComponent } from './components/products/detail/detail.component';
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { CustomerComponent } from './components/customer/customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TicketComponent } from './components/ticket/ticket/ticket.component';
import { TicketDetailComponent } from './components/ticket/ticket-detail/ticket-detail.component';
import { NotFoundService } from './Services/not-found.service';
import { CustomerModule } from './customer/customer.module';
import { ChatService } from './Services/chat.service';
// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    AddProductComponent,
    ProductComponent,
    EditproductComponent,
    DetailComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CustomerComponent,
    EditCustomerComponent,
    AddCustomerComponent,
    NotFoundComponent,
    TicketComponent,
    TicketDetailComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions ({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    SnotifyModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    NgbModule,
    Ng2SmartTableModule,
    ToastrModule.forRoot(),
    CustomerModule,
    NgxPaginationModule,
    MatSlideToggleModule,
    // FlexLayoutModule
  ],
  providers: [JarwisService,
    TokenService,
    AuthService,
    ChatService,
    NotFoundService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
