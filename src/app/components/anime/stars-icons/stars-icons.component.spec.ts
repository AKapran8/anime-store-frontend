import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartIconsComponent } from './stars-icons.component';

describe('StartIconsComponent', () => {
  let component: StartIconsComponent;
  let fixture: ComponentFixture<StartIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartIconsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
