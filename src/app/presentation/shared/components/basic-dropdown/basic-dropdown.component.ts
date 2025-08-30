import {
  Component,
  ContentChild,
  TemplateRef,
  forwardRef,
  input,
} from '@angular/core';
import { SelectModule } from 'primeng/select';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DropdownOption } from './basic-dropdown.types';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-basic-dropdown',
  templateUrl: './basic-dropdown.component.html',
  styleUrls: ['./basic-dropdown.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BasicDropdownComponent),
    },
  ],
  imports: [SelectModule, FormsModule, MatFormFieldModule],
})
export class BasicDropdownComponent implements ControlValueAccessor {
  label = input('');
  placeholder = input('Seleccionar');
  options = input<DropdownOption<any>[]>([]);
  optionValue = input<string | undefined>();

  isDisabled = false;
  value: DropdownOption | undefined;

  @ContentChild('itemTemplate') itemTemplate: TemplateRef<any> | undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onChange: any = (value: DropdownOption) => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onTouch: any = (value: DropdownOption) => {};

  writeValue(value: DropdownOption): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
