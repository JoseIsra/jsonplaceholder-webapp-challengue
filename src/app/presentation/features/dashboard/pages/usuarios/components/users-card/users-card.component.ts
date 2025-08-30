import { UserDto } from '@/data/dtos/users/users.response.dto';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class UsersCardComponent {
  users = input<UserDto[]>([]);
  openUserDetails = output<number>();

  handleOpenUserDetails(user: UserDto) {
    this.openUserDetails.emit(user.id);
  }
}
