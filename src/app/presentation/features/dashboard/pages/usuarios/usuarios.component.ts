import { NoParam } from '@/domain/base/params/no-param.paylod';
import { ObtenerUsuariosUseCase } from '@/domain/usecases/usuarios/obtener-usuarios/obtener-usuarios.usecase';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { UsersStoreService } from './services/usersStore.service';
import { DataTableComponent } from '@/presentation/shared/components/data-table/data-table.component';
import { PaginatorComponent } from '@/presentation/shared/components/paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { Paginator } from '@/presentation/shared/components/paginator/paginator.types';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ObtenerDetalleUsuarioUseCase } from '@/domain/usecases/usuarios/obtener-detalle-usuario/obtener-detalle-usuario.usecase';
import { Param } from '@/domain/base/params/param.payload';
import { DialogTriggerService } from '@/presentation/shared/services/dialog-trigger/dialog-trigger.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { BasicInputComponent } from '@/presentation/shared/components/basic-input/basic-input.component';
import { textNormalizer } from '@/data/utils/helpers';
import { UserDto } from '@/data/dtos/users/users.response.dto';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  imports: [
    DataTableComponent,
    PaginatorComponent,
    FormsModule,
    MatButtonModule,
    MatIcon,
    NgTemplateOutlet,
    BasicInputComponent,
    AsyncPipe,
  ],
  standalone: true,
})
export class UsuariosComponent implements OnInit, OnDestroy {
  readonly ITEMS_PER_PAGE = 10;

  destroy$ = new Subject<void>();
  userDetails$ = new Subject<void>();
  userSearchControl = signal('');
  searchTerms = new BehaviorSubject<string>('');
  currentPage = signal(1);
  loading = signal(false);

  filteredUsers$ = new Observable<UserDto[]>();

  constructor(
    private obtenerUsuariosUseCase: ObtenerUsuariosUseCase,
    private userStoreService: UsersStoreService,
    private obtenerDetalleUsuarioUseCase: ObtenerDetalleUsuarioUseCase,
    private dialogTriggerService: DialogTriggerService,
  ) {}

  ngOnInit() {
    this.handleGetUsers();
    this.setupSearchTermWatcher();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.userDetails$.complete();
  }

  usersList = computed(() => this.userStoreService.users);

  totalUsers = computed(() => this.userStoreService.totalUsers);

  handleSearchingUser(value: string) {
    this.searchTerms.next(value);
  }

  setupSearchTermWatcher() {
    this.filteredUsers$ = this.searchTerms.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      map((searchterm) => {
        const normalizedSearch = textNormalizer(searchterm);

        return this.usersList().filter((u) =>
          textNormalizer(u.name).includes(normalizedSearch),
        );
      }),
    );
  }

  handleGetUsers() {
    this.loading.set(true);
    this.obtenerUsuariosUseCase
      .execute(new NoParam())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          this.userStoreService.setTotalUsers(res);
          this.userStoreService.setUsers(res.slice(0, this.ITEMS_PER_PAGE));
        },
        error: (error) => {
          this.loading.set(false);
          console.error(error);
        },
      });
  }

  onPageChange(paginator: Paginator) {
    const newPage = (paginator.page - 1) * this.ITEMS_PER_PAGE;

    const slicedUsers =
      paginator.page === paginator.lastPage
        ? this.userStoreService.totalUsers.slice(newPage)
        : this.userStoreService.totalUsers.slice(newPage, this.ITEMS_PER_PAGE);

    this.userStoreService.setUsers(slicedUsers);
  }

  handleOpeUserDetails(id: number) {
    this.userDetails$.next();
    this.obtenerDetalleUsuarioUseCase
      .execute(
        new Param({
          id,
        }),
      )
      .pipe(takeUntil(this.userDetails$))
      .subscribe({
        next: (res) => {
          this.dialogTriggerService.triggerDefaulDialog(UserDetailsComponent, {
            data: {
              userData: res,
            },
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
