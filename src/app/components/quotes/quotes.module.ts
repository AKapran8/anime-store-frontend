import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { QuotesComponent } from './quotes.component';
import { AddEditQuoteComponent } from './add-edit-quote/add-edit-quote.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { QuotesService } from './service/quotes.service';

const routes: Routes = [{ path: '', component: QuotesComponent }];

@NgModule({
  declarations: [QuotesComponent, AddEditQuoteComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  providers: [QuotesService],
})
export class QuotesModule {}
