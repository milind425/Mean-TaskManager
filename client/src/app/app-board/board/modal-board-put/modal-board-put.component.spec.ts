import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBoardPutComponent } from './modal-board-put.component';

describe('ModalBoardPutComponent', () => {
  let component: ModalBoardPutComponent;
  let fixture: ComponentFixture<ModalBoardPutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBoardPutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBoardPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
