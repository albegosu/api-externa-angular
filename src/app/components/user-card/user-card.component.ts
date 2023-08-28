import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  userService = inject(UserService);
  router = inject(Router);

  @Input() pushUser!: User | any;

  async deleteUser(id: string): Promise<void> {
    alert('¿Quieres borrar este perfil de usuario?')
    let response = await this.userService.delete(id);
    console.log(response);
    if (response) {
      alert('El usuario ha sido borrado correctamente');
      this.router.navigate(['/home'])
    }
  }
}
