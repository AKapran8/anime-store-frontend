import { NgModule } from '@angular/core';

import { HomeComponent } from '../components/home/home.component';
import { HomeRoutingModule } from '../routings/home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule],
  exports: [],
  providers: [],
})
export class HomeModule {}
