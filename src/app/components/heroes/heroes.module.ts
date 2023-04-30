import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { AddEditHeroComponent } from './add-edit-hero/add-edit-hero.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { HeroesService } from './service/heroes.service';

const routes: Routes = [{ path: '', component: HeroesComponent }];

@NgModule({
  declarations: [HeroesComponent, HeroesListComponent, AddEditHeroComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  exports: [HeroesComponent, HeroesListComponent, AddEditHeroComponent],
  providers: [HeroesService],
})
export class HeroesModule {}
