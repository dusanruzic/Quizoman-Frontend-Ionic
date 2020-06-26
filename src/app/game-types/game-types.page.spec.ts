import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTypesPage } from './game-types.page';

describe('GameTypesPage', () => {
  let component: GameTypesPage;
  let fixture: ComponentFixture<GameTypesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTypesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
