import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListproductComponent } from './product/listproduct/listproduct.component';
import { DetailproductComponent } from './product/detailproduct/detailproduct.component';
import { DetailuserComponent } from './profile/detailuser/detailuser.component';
import { EdituserComponent } from './profile/edituser/edituser.component';
import { DetailticketComponent } from './ticket/detailticket/detailticket.component';
import { ListticketComponent } from './ticket/listticket/listticket.component';
import { NgbTabsetModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule,
  MatIconModule, MatPaginatorModule, MatTableModule, MatSortModule,
  MatInputModule, MatProgressSpinnerModule, MatCardModule, MatFormFieldModule,
  MatAutocompleteModule, MatTooltipModule, MatTabsModule, MatSnackBarModule,
  MatSlideToggleModule, MatSliderModule, MatSelectModule, MatRippleModule,
  MatRadioModule, MatProgressBarModule, MatNativeDateModule, MatMenuModule,
  MatGridListModule, MatExpansionModule, MatDialogModule, MatDatepickerModule,
  MatStepperModule, MatChipsModule, MatCheckboxModule, MatButtonToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguCarousel, NguCarouselStore, NguCarouselModule } from '@ngu/carousel';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';


@NgModule({
  declarations: [
    ListproductComponent,
    DetailproductComponent,
    DetailuserComponent,
    EdituserComponent,
    ListticketComponent,
    DetailticketComponent,
    ChatDialogComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgbTabsetModule,
    NgxPaginationModule,
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
    Ng2SearchPipeModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    NgbCarouselModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
