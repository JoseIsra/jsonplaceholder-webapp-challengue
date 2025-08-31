import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialogComponent } from './error-dialog.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { provideHttpClient } from '@angular/common/http';
import { NgMaterialModule } from '../../externals/ng-material/ng-material.module';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(() => {
    const dynamicdialogconfigSpy = jasmine.createSpyObj<DynamicDialogConfig>(
      'DynamicDialogConfig',
      [],
      {
        data: { message: 'error' },
      },
    );

    TestBed.configureTestingModule({
      imports: [NgMaterialModule],
      providers: [
        provideHttpClient(),
        DynamicDialogRef,
        { provide: DynamicDialogConfig, useValue: dynamicdialogconfigSpy },
      ],
    });
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
