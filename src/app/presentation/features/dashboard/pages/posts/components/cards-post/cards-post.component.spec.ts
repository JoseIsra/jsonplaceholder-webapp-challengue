import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPostComponent } from './cards-post.component';

describe('CardsPostComponent', () => {
  let component: CardsPostComponent;
  let fixture: ComponentFixture<CardsPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardsPostComponent],
    });
    fixture = TestBed.createComponent(CardsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
