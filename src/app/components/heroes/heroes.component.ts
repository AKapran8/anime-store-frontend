import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent implements OnInit {
  constructor(private _cdr: ChangeDetectorRef, private _router: Router) {}

  ngOnInit(): void {}

  public navigateToAddComponent(): void {
    this._router.navigate(['heroes', 'add-edit']);
  }
}
