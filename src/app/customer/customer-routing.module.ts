import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListproductComponent } from './product/listproduct/listproduct.component';
import { AfterLoginService } from '../Services/after-login.service';
import { DetailuserComponent } from './profile/detailuser/detailuser.component';
import { DetailproductComponent } from './product/detailproduct/detailproduct.component';
import { EdituserComponent } from './profile/edituser/edituser.component';
import { ListticketComponent } from './ticket/listticket/listticket.component';
import { DetailticketComponent } from './ticket/detailticket/detailticket.component';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';


const routes: Routes = [
  {
    path: '',
    component: ListproductComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'profile',
    component: DetailuserComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'profile/edit-user/:id',
    component: EdituserComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'product',
    component: ListproductComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'product/detail-product/:slug',
    component: DetailproductComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'ticket',
    component: ListticketComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'ticket/detail-ticket/:code',
    component: DetailticketComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'chat',
    component: ChatDialogComponent,
    // canActivate: [AfterLoginService]s
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
