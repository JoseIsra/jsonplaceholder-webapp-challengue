import { UserDto } from '@/data/dtos/users/users.response.dto';
import { Param } from '@/domain/base/params/param.payload';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { CrearPostUseCase } from '@/domain/usecases/posts/crear-post/crear-post.usecase';
import { BasicDropdownComponent } from '@/presentation/shared/components/basic-dropdown/basic-dropdown.component';
import { BasicInputComponent } from '@/presentation/shared/components/basic-input/basic-input.component';
import { Component, computed, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostStoreService } from '../../services/postStore.service';
import { DialogTriggerService } from '@/presentation/shared/services/dialog-trigger/dialog-trigger.service';
import { ErrorDialogComponent } from '@/presentation/shared/components/error-dialog/error-dialog.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ActualizarPostUseCase } from '@/domain/usecases/posts/actualizar-post/actualizar-post.usecase';

type DynamicData = {
  users: UserDto[];
  edit?: boolean;
  postData?: PostModel;
};

type FormValue = {
  id: number;
  title: string;
  body: string;
  user: number;
};

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.scss'],
  standalone: true,
  imports: [
    BasicDropdownComponent,
    BasicInputComponent,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule,
  ],
})
export class CreatePostDialogComponent implements OnInit {
  isFormUpdated = false;
  initialValue: PostModel | null = null;
  userOptions: UserDto[] = [];
  isEdition = signal(false);
  submitting = signal(false);

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private crearPostUsecase: CrearPostUseCase,
    private postStoreService: PostStoreService,
    private triggerDialog: DialogTriggerService,
    private actualizarPostUseCase: ActualizarPostUseCase,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.handleLoadInitData();
    this.populateEditionForm();
    this.setupFormWatcher();
  }

  dialogTitle = computed(() => {
    return this.isEdition() ? 'Editar Post' : 'Nuevo Post';
  });

  buttonLabel = computed(() => {
    return this.isEdition() ? 'Guardar cambios' : 'Crear post';
  });

  get isSubmitDisabled() {
    return (
      this.form.invalid ||
      this.submitting() ||
      (!this.isFormUpdated && this.isEdition())
    );
  }

  buildForm() {
    this.form = this.fb.group({
      id: new FormControl<string>(''),
      title: new FormControl<string>('', Validators.required),
      body: new FormControl<string>('', Validators.required),
      user: new FormControl<number | null>(null, Validators.required),
    });
  }

  setupFormWatcher() {
    this.form.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((fields) => {
        this.isFormUpdated = this.checkIsFormDifferent(fields as FormValue);
      });
  }

  checkIsFormDifferent(fields: FormValue) {
    return (
      this.initialValue?.title !== fields.title ||
      this.initialValue?.body !== fields.body ||
      this.initialValue?.userId !== fields.user
    );
  }

  handleLoadInitData() {
    const { users } = this.dynamicDialogConfig.data as DynamicData;

    this.userOptions = users;
  }

  populateEditionForm() {
    const { edit, postData } = this.dynamicDialogConfig.data as DynamicData;
    if (!edit && !postData) return;

    this.isEdition.set(Boolean(edit));
    this.initialValue = JSON.parse(JSON.stringify(postData));

    this.form.patchValue({
      id: postData?.id,
      title: postData?.title,
      body: postData?.body,
      user: postData?.userId,
    });
  }

  closeDialog() {
    this.ref.close();
  }

  handleCreatePost() {
    this.submitting.set(true);
    const { body, title, user } = this.form?.value as FormValue;

    this.crearPostUsecase
      .execute(
        new Param({
          body: body ?? '',
          title: title ?? '',
          userId: user ?? 0,
        }),
      )
      .subscribe({
        next: (res) => {
          this.postStoreService.addNewPost(res);
          this.closeDialog();
          this.submitting.set(false);
        },
        error: (error) => {
          this.submitting.set(false);

          this.triggerDialog.triggerDefaulDialog(ErrorDialogComponent, {
            data: {
              message: error.message,
            },
          });
        },
      });
  }

  handleEditPost() {
    this.submitting.set(true);
    const { body, title, user, id } = this.form?.value as FormValue;

    this.actualizarPostUseCase
      .execute(
        new Param({
          id: id ?? 0,
          body: body ?? '',
          title: title ?? '',
          userId: user ?? 0,
        }),
      )
      .subscribe({
        next: (res) => {
          this.postStoreService.updatePost(res);
          this.closeDialog();
          this.submitting.set(false);
        },
        error: (error) => {
          this.submitting.set(false);

          this.triggerDialog.triggerDefaulDialog(ErrorDialogComponent, {
            data: {
              message: error.message,
            },
          });
        },
      });
  }

  handleSubmitForm() {
    if (this.isEdition()) {
      this.handleEditPost();
    } else {
      this.handleCreatePost();
    }
  }
}
