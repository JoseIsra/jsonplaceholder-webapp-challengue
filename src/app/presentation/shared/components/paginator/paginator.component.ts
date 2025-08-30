import { Component, effect, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Paginator } from './paginator.types';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PaginatorComponent),
    },
  ],
})
export class PaginatorComponent implements ControlValueAccessor {
  readonly MINIMUM_PAGE = 1;

  totalItems = input(0);
  rows = input(0);
  value = signal<Paginator>({
    page: 1,
    lastPage: 1,
  });

  pages = signal<number[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChange = (val: Paginator) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onTouch = (val: Paginator) => {};

  action = effect(
    () => {
      if (this.totalItems() > 0 && this.rows() > 0) {
        const pageCount = Math.floor(this.totalItems() / this.rows());
        this.pages.set(this.generateRange(pageCount));
        this.value.set({
          page: 1,
          lastPage: pageCount,
        });
      }
    },
    {
      allowSignalWrites: true,
    },
  );

  generateRange(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(val: Paginator): void {
    this.value.set(val);
  }

  onPageChange(event: number) {
    this.value.update((val) => ({ ...val, page: event }));
    this.onChange(this.value());
  }
}
