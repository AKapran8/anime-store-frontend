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
import { PageEvent } from '@angular/material/paginator';

import {
  convertTimeToText,
  getModifiedAnimeItemComponent,
  getStarsDescription,
} from './custom.pipes';

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
  public tableData: ITableData[] = [];
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

    this.totalAnimeCount = this._animeList.length;
    this._paginateData();
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
        message: `Are you sure want to delete ${anime.name}?`,
        type: 'ANIME',
        id: anime.id,
      } as IDeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this._animeList = this._animeList.filter((a) => a.id !== anime.id);
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

  public onPageChange(event: PageEvent) {
    this._paginationConfig = event;
    this._modifyList();
  }

  private _paginateData(): void {
    let startIndex =
      this._paginationConfig.pageIndex * this._paginationConfig.pageSize;
    let endIndex = startIndex + this._paginationConfig.pageSize;
    if (endIndex > this.animeList.length) {
      endIndex = this.animeList.length;
    }
    this.tableData = [...this.animeList];
    this.tableData = this.animeList.slice(startIndex, endIndex);
    this._cdr.markForCheck();
  }

  private _resetPagination(): void {
    if (this._paginationConfig) {
      this._paginationConfig = { ...this._paginationConfig, pageIndex: 0 };
      this._modifyList();
    }
  }

  ngOnDestroy(): void {
    this._searchValueChangesSub?.unsubscribe();
  }
}
