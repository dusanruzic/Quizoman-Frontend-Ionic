import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RanglistaPage } from './ranglista.page';

describe('RanglistaPage', () => {
  let component: RanglistaPage;
  let fixture: ComponentFixture<RanglistaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RanglistaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RanglistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
