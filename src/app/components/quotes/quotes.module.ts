import { NgModule } from '@angular/core';

import { QuotesComponent } from './quotes.component';

import { AngularMaterialModule } from '../../modules/material.module';

import { QuotesService } from './service/quotes.service';

@NgModule({
  declarations: [QuotesComponent],
  imports: [AngularMaterialModule],
  exports: [],
  providers: [QuotesService],
})
export class QuotesModule {}
