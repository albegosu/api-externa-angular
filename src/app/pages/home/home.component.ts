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
  currentPage: number = 1;

  userService = inject(UserService);

  async ngOnInit(): Promise<void> {
    try {
      this.loadPage(this.currentPage);
    } catch (error) {
      console.log(error);
    }
  }

  async changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    await this.loadPage(pageNumber);
  }

  async loadPage(pageNumber: number) {
    try {
      this.allUsers = await this.userService.getAll(pageNumber);
    } catch (error) {
      console.log(error);
    }
  }
}
