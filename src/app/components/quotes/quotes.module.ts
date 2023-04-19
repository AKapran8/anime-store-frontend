import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { QuotesComponent } from './quotes.component';

import { AngularMaterialModule } from '../../modules/material.module';

import { QuotesService } from './service/quotes.service';

@NgModule({
  declarations: [QuotesComponent],
  imports: [AngularMaterialModule, BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule],
  exports: [],
  providers: [QuotesService],
})
export class QuotesModule {}
