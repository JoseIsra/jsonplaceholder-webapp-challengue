import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicDropdownComponent } from './basic-dropdown.component';
import { SelectModule } from 'primeng/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

describe('Test Basic Dropdown Component', () => {
  let fixture: ComponentFixture<BasicDropdownComponent>;
  let component: BasicDropdownComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, SelectModule, FormsModule],
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
