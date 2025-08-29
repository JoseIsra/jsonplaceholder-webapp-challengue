import {
  Component,
  ElementRef,
  forwardRef,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BasicInputComponent),
    },
  ],
})
export class BasicInputComponent implements ControlValueAccessor {
  label = input('');
  placeholder = input('');
  showError = input(false);
  errorMsg = input('');
  type = input<'text' | 'password'>('text');

  @ViewChild('inputElement', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;

  value = signal('');

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChange = (val: string) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onTouch = (val: string) => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: string): void {
    this.value.set(value);
  }

  handleInputChanged(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.value.set(value);
    this.onChange(this.value());
  }
}
