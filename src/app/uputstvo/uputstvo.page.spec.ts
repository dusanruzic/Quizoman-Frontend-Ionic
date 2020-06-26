import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UputstvoPage } from './uputstvo.page';

describe('UputstvoPage', () => {
  let component: UputstvoPage;
  let fixture: ComponentFixture<UputstvoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UputstvoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UputstvoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
