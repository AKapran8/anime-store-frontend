import { NgModule } from '@angular/core';

import { QuotesComponent } from '../components/quotes/quotes.component';

import { HelpModule } from 'src/app/modules/another/help.module';
import { QuotesRoutingModule } from '../routings/quotes-routing.module';

import { QuotesService } from '../services/quotes/quotes.service';

@NgModule({
  declarations: [QuotesComponent],
  imports: [HelpModule, QuotesRoutingModule],
  exports: [],
  providers: [QuotesService],
})
export class QuotesModule {}
