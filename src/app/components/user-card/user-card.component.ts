import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
    const result = await Swal.fire({
      title: '¿Quieres eliminar este usuario?',
      text: "Esta acción no podrá deshacerse",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5a9de6',
      cancelButtonColor: '#eb9b9b',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      let response = await this.userService.delete(id);
      console.log(response);
      if (response) {
        Swal.fire(
          'Eliminado',
          'El usuario se ha eliminado correctamente.',
          'success'
        );
        this.router.navigate(['/home']);
      }
    }
  }
}
