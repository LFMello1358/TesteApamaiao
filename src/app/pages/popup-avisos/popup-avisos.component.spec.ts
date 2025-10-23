import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAvisosComponent } from './popup-avisos.component';

describe('PopupAvisosComponent', () => {
  let component: PopupAvisosComponent;
  let fixture: ComponentFixture<PopupAvisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAvisosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
