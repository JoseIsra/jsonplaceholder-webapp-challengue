import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { CreatePostDialogComponent } from './create-post-dialog.component';
import { CrearPostUseCase } from '@/domain/usecases/posts/crear-post/crear-post.usecase';
import { ActualizarPostUseCase } from '@/domain/usecases/posts/actualizar-post/actualizar-post.usecase';
import { PostStoreService } from '../../services/postStore.service';
import { DialogTriggerService } from '@/presentation/shared/services/dialog-trigger/dialog-trigger.service';
import { ErrorDialogComponent } from '@/presentation/shared/components/error-dialog/error-dialog.component';
import { UserDto } from '@/data/dtos/users/users.response.dto';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { NgMaterialModule } from '@/presentation/shared/externals/ng-material/ng-material.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { asyncData, asyncError } from '@/data/utils/testing/async-data';

describe('CreatePostDialogComponent', () => {
  let component: CreatePostDialogComponent;
  let fixture: ComponentFixture<CreatePostDialogComponent>;

  let mockDialogRef: jasmine.SpyObj<DynamicDialogRef>;
  let mockCrearPostUseCase: jasmine.SpyObj<CrearPostUseCase>;
  let mockActualizarPostUseCase: jasmine.SpyObj<ActualizarPostUseCase>;
  let mockPostStoreService: jasmine.SpyObj<PostStoreService>;
  let mockDialogTriggerService: jasmine.SpyObj<DialogTriggerService>;

  const mockUsers: UserDto[] = [
    {
      id: 1,
      name: 'Usuario 1',
      username: 'usuario1',
      email: 'usuario1@test.com',
      phone: '123456789',
    },
    {
      id: 2,
      name: 'Usuario 2',
      username: 'usuario2',
      email: 'usuario2@test.com',
      phone: '987654321',
    },
  ];

  const mockPostData: PostModel = {
    id: 1,
    title: 'Título del post',
    body: 'Contenido del post',
    userId: 1,
  };

  beforeEach(() => {
    const mockDialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', [
      'close',
    ]);
    const mockDialogConfigSpy = jasmine.createSpyObj(
      'DynamicDialogConfig',
      [],
      {
        data: { users: mockUsers },
      },
    );

    const mockCrearPostUseCaseSpy = jasmine.createSpyObj('CrearPostUseCase', [
      'execute',
    ]);

    const mockActualizarPostUseCaseSpy = jasmine.createSpyObj(
      'ActualizarPostUseCase',
      ['execute'],
    );

    const mockPostStoreServiceSpy = jasmine.createSpyObj('PostStoreService', [
      'addNewPost',
      'updatePost',
    ]);

    const mockDialogTriggerServiceSpy = jasmine.createSpyObj(
      'DialogTriggerService',
      ['triggerDefaulDialog'],
    );

    TestBed.configureTestingModule({
      imports: [NgMaterialModule],
      providers: [
        provideHttpClient(withFetch()),
        FormBuilder,
        DynamicDialogConfig,
        { provide: DynamicDialogRef, useValue: mockDialogRefSpy },
        { provide: DynamicDialogConfig, useValue: mockDialogConfigSpy },
        { provide: CrearPostUseCase, useValue: mockCrearPostUseCaseSpy },
        {
          provide: ActualizarPostUseCase,
          useValue: mockActualizarPostUseCaseSpy,
        },
        { provide: PostStoreService, useValue: mockPostStoreServiceSpy },
        {
          provide: DialogTriggerService,
          useValue: mockDialogTriggerServiceSpy,
        },
      ],
    });

    fixture = TestBed.createComponent(CreatePostDialogComponent);
    component = fixture.componentInstance;
    mockDialogRef = mockDialogRefSpy;
    mockCrearPostUseCase = mockCrearPostUseCaseSpy;
    mockActualizarPostUseCase = mockActualizarPostUseCaseSpy;
    mockPostStoreService = mockPostStoreServiceSpy;
    mockDialogTriggerService = mockDialogTriggerServiceSpy;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inicialización', () => {
    it('should initialize with correct default values', () => {
      component.ngOnInit();

      expect(component.userOptions).toEqual(mockUsers);
      expect(component.isEdition()).toBeFalse();
      expect(component.submitting()).toBeFalse();
      expect(component.isFormUpdated).toBeFalse();
    });

    it('should build form with correct structure', () => {
      expect(component.form).toBeDefined();
      expect(component.form.get('title')).toBeDefined();
      expect(component.form.get('body')).toBeDefined();
      expect(component.form.get('user')).toBeDefined();
      expect(component.form.get('id')).toBeDefined();
    });
  });

  describe('Computed properties', () => {
    it('should return correct dialog title for create mode', () => {
      component.isEdition.set(false);
      expect(component.dialogTitle()).toBe('Nuevo Post');
    });

    it('should return correct dialog title for edit mode', () => {
      component.isEdition.set(true);
      expect(component.dialogTitle()).toBe('Editar Post');
    });

    it('should return correct button label for create mode', () => {
      component.isEdition.set(false);
      expect(component.buttonLabel()).toBe('Crear post');
    });

    it('should return correct button label for edit mode', () => {
      component.isEdition.set(true);
      expect(component.buttonLabel()).toBe('Guardar cambios');
    });
  });

  describe('Form validation', () => {
    it('should be invalid when form is empty', () => {
      expect(component.form.invalid).toBeTrue();
    });

    it('should be valid when all required fields are filled', () => {
      component.form.patchValue({
        title: 'Título del post',
        body: 'Contenido del post',
        user: 1,
      });

      expect(component.form.valid).toBeTrue();
    });

    it('should disable submit button when form is invalid', () => {
      expect(component.isSubmitDisabled).toBeTrue();
    });

    it('should enable submit button when form is valid', () => {
      component.form.patchValue({
        title: 'Título del post',
        body: 'Contenido del post',
        user: 1,
      });

      expect(component.isSubmitDisabled).toBeFalse();
    });
  });

  describe('Create post functionality', () => {
    it('should create post successfully', fakeAsync(() => {
      const mockResponse = { ...mockPostData, id: 3 };
      mockCrearPostUseCase.execute.and.returnValue(asyncData(mockResponse));
      spyOn(component, 'handleCreatePost').and.callThrough();
      spyOn(component, 'closeDialog');

      component.handleCreatePost();
      expect(component.submitting()).toBeTrue();

      tick();

      expect(mockCrearPostUseCase.execute).toHaveBeenCalled();
      expect(mockPostStoreService.addNewPost).toHaveBeenCalledWith(
        mockResponse,
      );
      expect(component.closeDialog).toHaveBeenCalled();
      expect(component.submitting()).toBeFalse();
    }));

    it('should handle error when creating post', fakeAsync(() => {
      const mockError = new Error('Error al crear el post');
      mockCrearPostUseCase.execute.and.returnValue(asyncError(mockError));
      spyOn(component, 'handleCreatePost').and.callThrough();
      spyOn(component, 'closeDialog');

      component.handleCreatePost();
      expect(component.submitting()).toBeTrue();

      tick();

      expect(mockDialogTriggerService.triggerDefaulDialog).toHaveBeenCalledWith(
        ErrorDialogComponent,
        {
          data: {
            message: mockError.message,
          },
        },
      );
      expect(component.submitting()).toBeFalse();
    }));
  });

  describe('Edit post functionality', () => {
    it('should update post successfully', fakeAsync(() => {
      const mockResponse = { ...mockPostData, title: 'Título actualizado' };
      mockActualizarPostUseCase.execute.and.returnValue(
        asyncData(mockResponse),
      );

      spyOn(component, 'handleEditPost').and.callThrough();
      spyOn(component, 'closeDialog');

      component.handleEditPost();
      expect(component.submitting()).toBeTrue();
      tick();

      expect(mockActualizarPostUseCase.execute).toHaveBeenCalled();
      expect(mockPostStoreService.updatePost).toHaveBeenCalledWith(
        mockResponse,
      );
      expect(component.closeDialog).toHaveBeenCalled();
      expect(component.submitting()).toBeFalse();
    }));

    it('should handle error when updating post', fakeAsync(() => {
      const mockError = new Error('Error al actualizar el post');
      mockActualizarPostUseCase.execute.and.returnValue(asyncError(mockError));

      spyOn(component, 'handleEditPost').and.callThrough();
      component.handleEditPost();
      expect(component.submitting()).toBeTrue();
      tick();

      expect(mockDialogTriggerService.triggerDefaulDialog).toHaveBeenCalledWith(
        ErrorDialogComponent,
        {
          data: {
            message: mockError.message,
          },
        },
      );
      expect(component.submitting()).toBeFalse();
    }));
  });

  describe('Form submission', () => {
    it('should call handleCreatePost when not in edit mode', () => {
      spyOn(component, 'handleCreatePost');
      spyOn(component, 'handleSubmitForm').and.callThrough();
      component.isEdition.set(false);

      component.handleSubmitForm();

      expect(component.handleCreatePost).toHaveBeenCalled();
    });

    it('should call handleEditPost when in edit mode', () => {
      spyOn(component, 'handleEditPost');
      spyOn(component, 'handleSubmitForm').and.callThrough();

      component.isEdition.set(true);

      component.handleSubmitForm();

      expect(component.handleEditPost).toHaveBeenCalled();
    });
  });

  describe('Dialog actions', () => {
    it('should close dialog when closeDialog is called', () => {
      component.closeDialog();

      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });
});
