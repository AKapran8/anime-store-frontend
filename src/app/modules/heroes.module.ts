import { NgModule } from '@angular/core';

import { HeroesComponent } from '../components/heroes/heroes.component';
import { HeroesListComponent } from '../components/heroes/heroes-list/heroes-list.component';
import { AddEditHeroComponent } from '../components/heroes/add-edit-hero/add-edit-hero.component';

import { HelpModule } from 'src/app/modules/another/help.module';
import { HeroesRoutingModule } from '../routings/heroes-routing.module';

import { HeroesService } from '../services/heroes/heroes.service';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroesListComponent,
    AddEditHeroComponent
  ],
  imports: [
    HelpModule,
    HeroesRoutingModule
  ],
  exports: [],
  providers: [HeroesService],
})
export class HeroesModule { }
