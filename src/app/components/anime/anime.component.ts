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
import { take } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { cloneDeep } from 'lodash';

import { convertTimeToText, getStarsDescription } from './custom.pipes';

import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from '../delete-dialog/delete-dialog.component';
import { AddAnimeComponent } from './add-anime/add-anime.component';

import {
  IAddEditAnime,
  IAnime,
  ITableData,
} from 'src/app/components/anime/anime.mode';

import { AnimeService } from './service/anime.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent implements OnInit, OnDestroy {
  public totalAnimeCount: number = 0;
  public pageSizeOptions: number[] = [1, 2, 3];
  public pageSize: number = 1;
  public searchControl: FormControl | null = null;
  public animeList: ITableData[] = [];
  public isListFetching: boolean = false;
  public isListFetched: boolean = false;

  private _animeList: IAnime[] = [];
  private _paginationConfig: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 1,
    previousPageIndex: 0,
  };
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
      .getAnimeList(this._paginationConfig)
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this._animeList = cloneDeep(res.data.animeList);
          this.isListFetching = false;
          this.isListFetched = true;
          this.totalAnimeCount = res.data.totalElements;
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

    this._cdr.markForCheck();
  }

  private _initSearchControl(): void {
    this.searchControl = new FormControl('');

    this._searchValueChangesSub = this.searchControl?.valueChanges.subscribe(
      (inputValue: string) => {
        if (inputValue) {
          this._resetPagination();
        }
      }
    );
  }

  public addAnime(): void {
    const dialogRef = this._dialog.open(AddAnimeComponent);
    dialogRef.afterClosed().subscribe((isAdded: boolean) => {
      if (isAdded) this._getAnimeList();
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

    dialogRef.afterClosed().subscribe((isEdited: boolean) => {
      if (isEdited) this._getAnimeList();
    });
  }

  public removeItem(anime: ITableData): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        message: `Are you sure want to delete ${anime.name}?`,
        type: 'ANIME',
        id: anime.id,
      } as IDeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((isDeleted: boolean) => {
      if (isDeleted) this._getAnimeList();
    });
  }

  public getAnimeById(id: string): void {
    this._router.navigate(['anime', id]);
  }

  public stopPropaganation(event: MouseEvent): void {
    event.stopPropagation();
  }

  public onPageChange(event: PageEvent) {
    this._paginationConfig = cloneDeep(event);
    this._getAnimeList();
  }

  private _resetPagination(): void {
    if (this._paginationConfig) {
      this._paginationConfig = { ...this._paginationConfig, pageIndex: 0 };
    }
  }

  ngOnDestroy(): void {
    this._searchValueChangesSub?.unsubscribe();
  }
}
