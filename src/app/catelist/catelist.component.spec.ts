import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelistComponent } from './catelist.component';

describe('CatelistComponent', () => {
  let component: CatelistComponent;
  let fixture: ComponentFixture<CatelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatelistComponent]
    });
    fixture = TestBed.createComponent(CatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
