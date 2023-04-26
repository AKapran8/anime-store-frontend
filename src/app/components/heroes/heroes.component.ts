import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

import { AddEditHeroComponent } from './add-edit-hero/add-edit-hero.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';

import { IAddEditHeroDialogData, IHero } from 'src/app/components/heroes/hero.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent implements OnInit {
  @ViewChild(HeroesListComponent, { static: false, read: HeroesListComponent })
  heroesListComponent!: HeroesListComponent;

  constructor(private _cdr: ChangeDetectorRef, private _dialog: MatDialog) {}

  ngOnInit(): void {}

  public addNewHeroHandler(): void {
    const dialogRef = this._dialog.open(AddEditHeroComponent, {
      data: { type: 'add' } as IAddEditHeroDialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((hero: IHero) => {
        if (hero) {
          this.heroesListComponent.addHero(hero);
        }
      });
  }
}
