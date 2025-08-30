import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  imports: [NgTemplateOutlet],
  standalone: true,
})
export class DataTableComponent {
  rows = input(10);
  data = input<any>([]);

  @ContentChild('headerTemplate') headerTemplate: TemplateRef<any> | undefined;
  @ContentChild('bodyTemplate') bodyTemplate: TemplateRef<any> | undefined;
}
