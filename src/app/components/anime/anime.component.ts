import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

import {
  convertTimeToText,
  getModifiedAnimeItemComponent,
  getStarsDescription,
} from 'src/app/help-functions/anime.pipes';

import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from '../delete-dialog/delete-dialog.component';
import { AddAnimeComponent } from './add-anime/add-anime.component';

import { IAddEditAnime, IAnime, ITableData } from 'src/app/models/anime.mode';

import { AnimeService } from '../../services/anime/anime.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent implements OnInit, OnDestroy {
  public animeCount: number = 0;
  public searchControl: FormControl | null = null;
  public animeList: ITableData[] = [];
  public isListFetching: boolean = false;
  public isListFetched: boolean = false;

  private _animeList: IAnime[] = [];
  private _searchValueChangesSub: Subscription | null = null;

  constructor(
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _animeService: AnimeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._getAnimeList();
    this._initSearchControl();
  }

  private _getAnimeList(): void {
    this.isListFetching = true;
    this.isListFetched = false;

    this._animeService
      .getAnimeList()
      .pipe(
        map((animeData) => {
          return animeData.animeList.map((a) =>
            getModifiedAnimeItemComponent(a)
          );
        }),
        take(1)
      )
      .subscribe((res) => {
        if (res) {
          this._animeList = [...res];
          this.isListFetching = false;
          this.isListFetched = true;
          this._modifyList();
        }
      });

    this._cdr.markForCheck();
  }

  private _modifyList(): void {
    this.animeList = this._animeList.map((a) => {
      const starsDescr = getStarsDescription(a.stars - 1);
      const timeText = convertTimeToText(a.time);

      return {
        ...a,
        starsDescr,
        timeText,
      };
    });

    this.animeCount = this._animeList.length;
    this._cdr.markForCheck();
  }

  private _initSearchControl(): void {
    this.searchControl = new FormControl('');

    this._searchValueChangesSub = this.searchControl?.valueChanges.subscribe(
      (inputValue: string) => {
        console.log(inputValue);
      }
    );
  }

  public addAnime(): void {
    const dialogRef = this._dialog.open(AddAnimeComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.anime) {
        const newElem: IAnime = getModifiedAnimeItemComponent(res.anime);

        this._animeList.push(newElem);
        this._modifyList();
      }
    });
  }

  public editAnime(row: ITableData): void {
    const editRow: IAddEditAnime = {
      name: row.name,
      nameUA: row.nameUA,
      stars: row.stars,
      time: row.time,
      genres: row.genres,
      status: row.status,
      id: row.id,
    };

    const dialogRef = this._dialog.open(AddAnimeComponent, {
      data: editRow,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.anime) {
        const updatedAnime: IAnime = getModifiedAnimeItemComponent(res.anime);

        this._animeList = this._animeList.map((el) => {
          if (el.id === updatedAnime.id) return updatedAnime;
          return el;
        });

        this._modifyList();
      }
    });
  }

  public removeItem(anime: ITableData): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        message: `Are you sure want to delete ${anime.name}`,
        type: 'ANIME',
        id: anime.id,
      } as IDeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const index: number = this._animeList.findIndex(
          (a) => a.id === anime.id
        );

        this._animeList.splice(index, 1);
        this._modifyList();
      }
    });
  }

  public getAnimeById(id: string): void {
    this._router.navigate(['anime', id]);
  }

  public stopPropaganation(event: MouseEvent): void {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this._searchValueChangesSub?.unsubscribe();
  }
}
