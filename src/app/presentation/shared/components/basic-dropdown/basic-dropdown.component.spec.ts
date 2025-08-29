import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonsModule } from '../../commons.module';
import { BasicDropdownComponent } from './basic-dropdown.component';

describe('Test Basic Dropdown Component', () => {
  let fixture: ComponentFixture<BasicDropdownComponent>;
  let component: BasicDropdownComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule],
      declarations: [BasicDropdownComponent],
    });
    fixture = TestBed.createComponent(BasicDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register touch and change', () => {
    expect(component.onChange({})).toEqual(undefined);
    expect(component.onTouch()).toEqual(undefined);
  });
});
