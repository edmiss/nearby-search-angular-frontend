import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteTableComponent } from './favourite-table.component';

describe('FavouriteTableComponent', () => {
  let component: FavouriteTableComponent;
  let fixture: ComponentFixture<FavouriteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
