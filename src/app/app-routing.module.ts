import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { BeforeLoginService } from './Services/before-login.service';
import { AfterLoginService } from './Services/after-login.service';
import { AddProductComponent } from './components/products/addproduct/addproduct.component';
import { ProductComponent } from './components/products/product/product.component';
import { EditproductComponent } from './components/products/editproduct/editproduct.component';
import { DetailComponent } from './components/products/detail/detail.component';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TicketComponent } from './components/ticket/ticket/ticket.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent, canActivate: [BeforeLoginService],
  },
  { path: 'signup', component: SignupComponent, canActivate: [BeforeLoginService]},
  { path: 'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService]},
  { path: 'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService]},
  // {
  //   path: 'admin',
  //   component: ProfileComponent,
  //   canActivate: [AfterLoginService],
  //   children: [
  //     {
  //       path: 'profile',
  //       component: ProfileComponent,
  //       canActivate: [AfterLoginService]
  //     },
  //     {
  //       path: '',
  //       component: ProductComponent,
  //       children: [
  //         {
  //           path: 'product',
  //           component: ProductComponent,
  //           children: [
  //             {
  //               path: 'add-product',
  //               component: AddProductComponent,
  //               canActivate: [AfterLoginService]
  //             },
  //             {
  //               path: 'edit-product/:id',
  //               component: EditproductComponent,
  //               canActivate: [AfterLoginService]
  //             },
  //             {
  //               path: 'detail-product/:id',
  //               component: DetailComponent,
  //               canActivate: [AfterLoginService]
  //             }
  //           ]
  //         },
  //         {
  //           path: 'category',
  //           component: CategoryComponent,
  //           children: [
  //             {
  //               path: 'add-category',
  //               component: AddCategoryComponent,
  //               canActivate: [AfterLoginService]
  //             },
  //             {
  //               path: 'edit-category/:slug',
  //               component: EditCategoryComponent,
  //               canActivate: [AfterLoginService]
  //             }
  //           ]
  //         },
  //         {
  //           path: 'customer',
  //           component: CustomerComponent,
  //           children: [
  //             {
  //               path: 'add-customer',
  //               component: AddCustomerComponent,
  //               canActivate: [AfterLoginService]
  //             },
  //             {
  //               path: 'edit-customer/:id',
  //               component: EditCustomerComponent,
  //               canActivate: [AfterLoginService]
  //             }
  //           ]
  //         },
  //       ]
  //     }
  //   ]
  // },
  { path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService]},
  { path: 'product/add-product', component: AddProductComponent, canActivate: [AfterLoginService]},
  { path: 'product/edit-product/:id', component: EditproductComponent, canActivate: [AfterLoginService]},
  { path: 'product', component: ProductComponent, canActivate: [AfterLoginService]},
  { path: 'product/product-detail/:id', component: DetailComponent, canActivate: [AfterLoginService]},
  { path: 'category', component: CategoryComponent, canActivate: [AfterLoginService]},
  { path: 'category/add-category', component: AddCategoryComponent, canActivate: [AfterLoginService]},
  { path: 'category/edit-category/:slug', component: EditCategoryComponent, canActivate: [AfterLoginService]},
  { path: 'customer', component: CustomerComponent, canActivate: [AfterLoginService]},
  { path: 'customer/add-customer', component: AddCustomerComponent, canActivate: [AfterLoginService]},
  { path: 'customer/edit-customer/:id', component: EditCustomerComponent, canActivate: [AfterLoginService]},
  { path: 'ticket', component: TicketComponent, canActivate: [AfterLoginService]},
  { path: 'not-found', component: NotFoundComponent, canActivate: [AfterLoginService]},
  {
    path: 'customers',
    loadChildren: () => import(`./customer/customer.module`).then(mod => mod.CustomerModule)
  },
  {
    path: '**',
    redirectTo: '/not-found'
  },
  { path: '',
    redirectTo: '/product',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
