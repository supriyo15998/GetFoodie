import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookfoodComponent } from './bookfood.component';

describe('BookfoodComponent', () => {
  let component: BookfoodComponent;
  let fixture: ComponentFixture<BookfoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookfoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
