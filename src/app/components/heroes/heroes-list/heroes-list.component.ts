import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { AddEditHeroComponent } from '../add-edit-hero/add-edit-hero.component';
import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from '../../delete-dialog/delete-dialog.component';

import {
  IHeroTableData,
  IHero,
  IAddEditHero,
  IAddEditHeroDialogData,
} from 'src/app/components/heroes/hero.model';

import { HeroesService } from '../service/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesListComponent implements OnInit {
  public heroes: IHeroTableData[] = [];

  private _heroes: IHero[] = [];

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
        this._heroes = res.heroesList;
        this._modifyHeroes();
      });
  }

  private _modifyHeroes(): void {
    this.heroes = this._heroes.map((hero: IHero) => {
      // const imagePath: string = `http://localhost:3000/images/${hero.imageUrl}`;
      const imagePath: string = `./../../../../assets/heroes/${hero.imageUrl}`;
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
    const initialValue: IAddEditHero = {
      name: hero.name,
      animeId: hero.animeId,
      imageUrl: hero.imageUrl,
      imagePath: hero.imagePath,
    };

    const dialogRef = this._dialog.open(AddEditHeroComponent, {
      data: {
        type: 'edit',
        heroId: hero.id,
        initialValue,
      } as IAddEditHeroDialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((updatedHero) => {
        if (updatedHero) {
          const hero: IHero = updatedHero;

          this._heroes = this._heroes.map((el) => {
            if (el.id === hero.id) return hero;
            return el;
          });

          this._modifyHeroes();
        }
      });
  }

  public addHero(hero: IHero): void {
    this._heroes.push(hero);
    this._modifyHeroes();
  }
}
