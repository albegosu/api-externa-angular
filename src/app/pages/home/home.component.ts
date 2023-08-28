import { Component, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allUsers: User[] = [];
  userService = inject(UserService);

  async ngOnInit(): Promise<void> {
    try {
      this.allUsers = await this.userService.getAll();
      // console.log(this.allUsers)
    } catch (error) {
      console.log(error)
    }
  }
}
