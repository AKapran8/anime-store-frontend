import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { take } from 'rxjs/operators';

import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from './../../delete-dialog/delete-dialog.component';
import { HeroesService } from '../service/heroes.service';
import { IAddEditHeroDialogData, IHero, IHeroTableData } from '../model.hero';
import { MatDialog } from '@angular/material/dialog';
import { AddEditHeroComponent } from '../add-edit-hero/add-edit-hero.component';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesListComponent implements OnInit {
  private _heroes: IHero[] = [];
  public heroes: IHeroTableData[] = [];

  constructor(
    private _cdr: ChangeDetectorRef,
    private _heroesService: HeroesService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getHeroes();
  }

  private _getHeroes(): void {
    this._heroesService
      .getHeroes()
      .pipe(take(1))
      .subscribe((res) => {
        this._heroes = res.data;
        this._modifyHeroes();
      });
  }

  private _modifyHeroes(): void {
    this.heroes = this._heroes.map((hero: IHero) => {
      const imagePath = `./../../../../assets/heroes/${hero.imageUrl}`;
      return { ...hero, imagePath };
    });
    this._cdr.markForCheck();
  }

  public removeHero(hero: IHeroTableData): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        message: `Are you sure want to delete ${hero.name}`,
        type: 'HERO',
        id: hero.id,
        imageUrl: hero.imageUrl
      } as IDeleteDialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          const index: number = this._heroes.findIndex((h) => h.id === hero.id);

          this._heroes.splice(index, 1);
          this._modifyHeroes();
        }
      });
  }

  public editHero(hero: IHeroTableData): void {
    const initialValue = {
      name: hero.name,
      animeId: hero.animeId,
      imageUrl: hero.imagePath
    };
    const dialogRef = this._dialog.open(AddEditHeroComponent, {
      data: {
        type: 'edit',
        heroId: hero.id,
        initialValue,
      } as IAddEditHeroDialogData,
    });
  }

  public addHero(hero: IHero): void {
    this._heroes.push(hero);
    this._modifyHeroes();
  }
}
