import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { AddEditHeroComponent } from './add-edit-hero/add-edit-hero.component';

import { AngularMaterialModule } from '../../modules/material.module';

import { HeroesService } from './service/heroes.service';

@NgModule({
  declarations: [HeroesComponent, HeroesListComponent, AddEditHeroComponent],
  imports: [AngularMaterialModule, BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule],
  exports: [],
  providers: [HeroesService],
})
export class HeroesModule {}
