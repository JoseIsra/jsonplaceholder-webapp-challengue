import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NgMaterialModule } from '@/presentation/shared/externals/ng-material/ng-material.module';
import { provideHttpClient } from '@angular/common/http';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgMaterialModule],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ id: '123' }),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Pruebas para el método downloadFile
  describe('downloadFile', () => {
    it('should download file when valid code is provided', async () => {
      const code = 'CTS';
      const fetchSpy = spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(new Blob())),
      );

      await component.donwloadFile(code);

      expect(fetchSpy).toHaveBeenCalledWith(component.LINKS[code]);
    });
  });

  // Pruebas para el manejo del sidebar móvil
  describe('mobile sidebar', () => {
    it('should open mobile sidebar', () => {
      component.handleOpenMobileSidebar();
      expect(component.mobileSidebarDialogVisible()).toBe(true);
    });

    it('should close mobile sidebar', () => {
      component.handleCloseMobileSidebar();
      expect(component.mobileSidebarDialogVisible()).toBe(false);
    });
  });
});
