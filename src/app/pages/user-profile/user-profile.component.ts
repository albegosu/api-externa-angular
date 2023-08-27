import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/users.service';

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

  // async deletePost(id: number): Promise<void> {
  //   alert('¿Estas seguro de borrar este post?')
  //   let response = await this.userService.delete(id);
  //   console.log(response);
  //   if (response) {
  //     alert('producto borrado correctamente');
  //     this.router.navigate(['/home'])
  //   }
  // }
}
