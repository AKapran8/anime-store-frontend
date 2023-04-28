import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [HeroesComponent, HeroesListComponent, AddEditHeroComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  exports: [],
  providers: [HeroesService],
})
export class HeroesModule {}
