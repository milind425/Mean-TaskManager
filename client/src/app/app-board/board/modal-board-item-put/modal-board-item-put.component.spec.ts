import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBoardItemPutComponent } from './modal-board-item-put.component';

describe('ModalBoardItemPutComponent', () => {
  let component: ModalBoardItemPutComponent;
  let fixture: ComponentFixture<ModalBoardItemPutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBoardItemPutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBoardItemPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
