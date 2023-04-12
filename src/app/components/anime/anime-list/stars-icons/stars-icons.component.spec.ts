import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsIconsComponent } from './stars-icons.component';

describe('StarsIconsComponent', () => {
  let component: StarsIconsComponent;
  let fixture: ComponentFixture<StarsIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsIconsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarsIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
