import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  router = inject(Router);
  oneUser!: User | any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: string = String(params.iduser)
      this.oneUser = await this.userService.getById(id);
    })
  }

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
