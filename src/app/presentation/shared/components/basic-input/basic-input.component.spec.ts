import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInputComponent } from './basic-input.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgMaterialModule } from '../../externals/ng-material/ng-material.module';
import { ButtonModule } from 'primeng/button';

describe('BasicInputComponent', () => {
  let component: BasicInputComponent;
  let fixture: ComponentFixture<BasicInputComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        InputTextModule,
        MatFormFieldModule,
        NgMaterialModule,
        ButtonModule,
      ],
    });
    fixture = TestBed.createComponent(BasicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
