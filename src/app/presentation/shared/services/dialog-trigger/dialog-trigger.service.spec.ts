import { TestBed } from '@angular/core/testing';
import { DialogTriggerService } from './dialog-trigger.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreatePostDialogComponent } from '@/presentation/features/dashboard/pages/posts/components/create-post-dialog/create-post-dialog.component';

describe('Service: DialogTrigger', () => {
  let service: DialogTriggerService;
  let _dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(() => {
    const dialogService = jasmine.createSpyObj<DialogService>('DialogService', [
      'open',
    ]);
    TestBed.configureTestingModule({
      providers: [
        DialogTriggerService,
        {
          provide: DialogService,
          useValue: dialogService,
        },
      ],
    });
    service = TestBed.inject(DialogTriggerService);
    _dialogService = TestBed.inject(
      DialogService,
    ) as jasmine.SpyObj<DialogService>;
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger default dialog', () => {
    service.triggerDefaulDialog(CreatePostDialogComponent);
    expect(_dialogService.open).toHaveBeenCalled();
  });

  it('should trigger dialog on the right side', () => {
    service.triggerDialogLeftSide(CreatePostDialogComponent);
    expect(_dialogService.open).toHaveBeenCalled();
  });
});
