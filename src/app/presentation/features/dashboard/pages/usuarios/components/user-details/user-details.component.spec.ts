import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgMaterialModule } from '@/presentation/shared/externals/ng-material/ng-material.module';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(() => {
    const dynamicdialogconfigSpy = jasmine.createSpyObj<DynamicDialogConfig>(
      'DynamicDialogConfig',
      [],
      {
        data: { userData: null },
      },
    );

    TestBed.configureTestingModule({
      imports: [NgMaterialModule],
      providers: [
        provideHttpClient(withFetch()),
        DynamicDialogRef,
        { provide: DynamicDialogConfig, useValue: dynamicdialogconfigSpy },
      ],
    });
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
