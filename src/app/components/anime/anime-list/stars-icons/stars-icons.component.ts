import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-stars-icons',
  templateUrl: './stars-icons.component.html',
  styleUrls: ['./stars-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarsIconsComponent implements OnInit {
  @Input() count: number = 0;

  public countArr: number[] = [];

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._initArr();
  }

  private _initArr(): void {
    for (let i = 0; i < this.count; i++) {
      this.countArr.push(i);
    }

    this._cdr.markForCheck();
  }
}
