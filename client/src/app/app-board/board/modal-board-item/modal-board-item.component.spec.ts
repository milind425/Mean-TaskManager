import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBoardItemComponent } from './modal-board-item.component';

describe('ModalBoardItemComponent', () => {
  let component: ModalBoardItemComponent;
  let fixture: ComponentFixture<ModalBoardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBoardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBoardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
