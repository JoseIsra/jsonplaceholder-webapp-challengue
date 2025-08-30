import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { UsuariosComponent } from './usuarios.component';
import { ObtenerUsuariosUseCase } from '@/domain/usecases/usuarios/obtener-usuarios/obtener-usuarios.usecase';
import { UsersStoreService } from './services/usersStore.service';
import { DialogTriggerService } from '@/presentation/shared/services/dialog-trigger/dialog-trigger.service';
import { ObtenerDetalleUsuarioUseCase } from '@/domain/usecases/usuarios/obtener-detalle-usuario/obtener-detalle-usuario.usecase';
import { UserDto } from '@/data/dtos/users/users.response.dto';
import { asyncData, asyncError } from '@/data/utils/testing/async-data';
import { ErrorDialogComponent } from '@/presentation/shared/components/error-dialog/error-dialog.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserModel } from '@/domain/models/users/users.response.model';
import { Param } from '@/domain/base/params/param.payload';
import { Paginator } from '@/presentation/shared/components/paginator/paginator.types';
import { NgMaterialModule } from '@/presentation/shared/externals/ng-material/ng-material.module';
import { provideHttpClient, withFetch } from '@angular/common/http';

const mockUsers: UserDto[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '123-456-7890',
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    phone: '098-765-4321',
  },
  {
    id: 3,
    name: 'Pen tester',
    username: 'pentesterbro',
    email: 'pentester@testing.com',
    phone: '098-111111',
  },
];

const mockUserDetails: UserModel = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  let mockObtenerUsuariosUseCase: jasmine.SpyObj<ObtenerUsuariosUseCase>;
  let mockUserStoreService: jasmine.SpyObj<UsersStoreService>;
  let mockDialogTriggerService: jasmine.SpyObj<DialogTriggerService>;
  let mockObtenerDetalleUsuarioUseCase: jasmine.SpyObj<ObtenerDetalleUsuarioUseCase>;

  beforeEach(() => {
    const obtenerUsuariosUseCaseSpy =
      jasmine.createSpyObj<ObtenerUsuariosUseCase>('ObtenerUsuariosUseCase', [
        'execute',
      ]);

    const obtenerDetalleUsuariosUseCaseSpy =
      jasmine.createSpyObj<ObtenerDetalleUsuarioUseCase>(
        'ObtenerDetalleUsuarioUseCase',
        ['execute'],
      );

    const dialogTriggerSpy = jasmine.createSpyObj('DialogTriggerService', [
      'triggerDefaulDialog',
    ]);

    const userStoreServiceSpy = jasmine.createSpyObj<UsersStoreService>(
      'UsersStoreService',
      ['setTotalUsers', 'setUsers'],
      {
        totalUsers: mockUsers,
        users: mockUsers.slice(0, 10),
      },
    );

    TestBed.configureTestingModule({
      imports: [NgMaterialModule],
      providers: [
        provideHttpClient(withFetch()),

        {
          provide: UsersStoreService,
          useValue: userStoreServiceSpy,
        },
        {
          provide: DialogTriggerService,
          useValue: dialogTriggerSpy,
        },
        {
          provide: ObtenerDetalleUsuarioUseCase,
          useValue: obtenerDetalleUsuariosUseCaseSpy,
        },
        {
          provide: ObtenerUsuariosUseCase,
          useValue: obtenerUsuariosUseCaseSpy,
        },
      ],
    });
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;

    mockObtenerUsuariosUseCase = obtenerUsuariosUseCaseSpy;
    mockDialogTriggerService = dialogTriggerSpy;
    mockUserStoreService = userStoreServiceSpy;
    mockObtenerDetalleUsuarioUseCase = obtenerDetalleUsuariosUseCaseSpy;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call handleGetUsers and SetupsearchTerm on initialization', () => {
      spyOn(component, 'ngOnInit').and.callThrough();
      spyOn(component, 'handleGetUsers');
      spyOn(component, 'setupSearchTermWatcher');
      component.ngOnInit();

      expect(component.handleGetUsers).toHaveBeenCalled();
      expect(component.setupSearchTermWatcher).toHaveBeenCalled();
    });
  });

  describe('handleGetUsers', () => {
    it('should call handleGetUsers sucessfully', fakeAsync(() => {
      mockObtenerUsuariosUseCase.execute.and.returnValue(asyncData(mockUsers));
      spyOn(component, 'handleGetUsers').and.callThrough();

      component.handleGetUsers();
      expect(component.loading()).toBe(true);
      tick();

      expect(component.loading()).toBe(false);
      expect(mockUserStoreService.setTotalUsers).toHaveBeenCalledWith(
        mockUsers,
      );
      expect(mockUserStoreService.setUsers).toHaveBeenCalledWith(
        mockUsers.slice(0, component.ITEMS_PER_PAGE),
      );
    }));

    it('should call handleGetUsers and handle errors', fakeAsync(() => {
      const mockError = new Error('Sucedió algo raro');
      mockObtenerUsuariosUseCase.execute.and.returnValue(asyncError(mockError));
      spyOn(component, 'handleGetUsers').and.callThrough();

      component.handleGetUsers();
      expect(component.loading()).toBe(true);
      tick();

      expect(component.loading()).toBe(false);
      expect(
        mockDialogTriggerService.triggerDefaulDialog,
      ).toHaveBeenCalledOnceWith(ErrorDialogComponent, {
        data: {
          message: mockError.message,
        },
      });
    }));
  });

  describe('handleOpeUserDetails', () => {
    it('should call handleOpeUserDetails sucessfully', fakeAsync(() => {
      mockObtenerDetalleUsuarioUseCase.execute.and.returnValue(
        asyncData(mockUserDetails),
      );
      spyOn(component, 'handleOpeUserDetails').and.callThrough();

      component.handleOpeUserDetails(mockUserDetails.id);
      tick();

      expect(mockObtenerDetalleUsuarioUseCase.execute).toHaveBeenCalledOnceWith(
        new Param({
          id: mockUserDetails.id,
        }),
      );

      expect(
        mockDialogTriggerService.triggerDefaulDialog,
      ).toHaveBeenCalledOnceWith(UserDetailsComponent, {
        data: {
          userData: mockUserDetails,
        },
      });
    }));

    it('should call handleOpeUserDetails and handle errors', fakeAsync(() => {
      const mockError = new Error('No hay detalle de usuario');
      mockObtenerDetalleUsuarioUseCase.execute.and.returnValue(
        asyncError(mockError),
      );

      spyOn(component, 'handleOpeUserDetails').and.callThrough();

      component.handleOpeUserDetails(mockUserDetails.id);
      tick();

      expect(
        mockDialogTriggerService.triggerDefaulDialog,
      ).toHaveBeenCalledOnceWith(ErrorDialogComponent, {
        data: {
          message: mockError.message,
        },
      });
    }));
  });

  describe('onPageChange', () => {
    it('should handle page change for first page', () => {
      const paginator: Paginator = { page: 1, lastPage: 3 };

      spyOn(component, 'onPageChange').and.callThrough();
      component.onPageChange(paginator);

      expect(mockUserStoreService.setUsers).toHaveBeenCalledWith(
        mockUsers.slice(0, component.ITEMS_PER_PAGE),
      );
    });

    it('should handle page change for middle page', () => {
      const paginator: Paginator = { page: 2, lastPage: 3 };
      spyOn(component, 'onPageChange').and.callThrough();

      component.onPageChange(paginator);
      const initFrom = (paginator.page - 1) * component.ITEMS_PER_PAGE;

      expect(mockUserStoreService.setUsers).toHaveBeenCalledWith(
        mockUsers.slice(initFrom, component.ITEMS_PER_PAGE + initFrom),
      );
    });

    it('should handle page change for last page', () => {
      const paginator: Paginator = { page: 3, lastPage: 3 };
      spyOn(component, 'onPageChange').and.callThrough();

      component.onPageChange(paginator);
      const initFrom = (paginator.page - 1) * component.ITEMS_PER_PAGE;

      expect(mockUserStoreService.setUsers).toHaveBeenCalledWith(
        mockUsers.slice(initFrom),
      );
    });
  });

  describe('searchinUser', () => {
    it('should call search Term observable stream', () => {
      spyOn(component, 'handleSearchingUser').and.callThrough();
      spyOn(component.searchTerms, 'next').and.callThrough();

      component.handleSearchingUser('a');
      expect(component.searchTerms.next).toHaveBeenCalledWith('a');
    });

    it('should setup search watcher', fakeAsync(() => {
      const searchTerm = 'pentester';
      let result: UserDto[] = [];

      component.setupSearchTermWatcher();
      component.filteredUsers$.subscribe((res) => {
        result = res;
      });

      component.searchTerms.next(searchTerm);
      tick(350);
      expect(result.length).toBe(0);
    }));
  });
});
