import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnContentComponent } from './column-content.component';

describe('ColumnContentComponent', () => {
  let component: ColumnContentComponent;
  let fixture: ComponentFixture<ColumnContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
