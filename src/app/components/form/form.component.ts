import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  userProfile: FormGroup
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService)
  router = inject(Router)

  constructor(){
    this.userProfile = new FormGroup({
      first_name: new FormControl("", []),
      last_name: new FormControl("", []),
      username: new FormControl("", []),
      email: new FormControl("", []),
      password: new FormControl("", []),
      image: new FormControl("", [])
    }, []);
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: string = String(params.iduser);

      if (id) {
        let response = await this.userService.getById(id)
        console.log(response);

        this.userProfile = new FormGroup({
          _id: new FormControl(response._id, []),
          first_name: new FormControl(response.first_name, []),
          last_name: new FormControl(response.last_name, []),
          username: new FormControl(response.username, []),
          email: new FormControl(response.email, []),
          password: new FormControl(response.password, []),
          image: new FormControl(response.image, [])
        }, []);
      }
    });

  }

  async dataForm(): Promise<void> {
  if (this.userProfile.value._id) {
    let response = await this.userService.update(this.userProfile.value)
    if (response) {
      alert('Usuario actualizado correctamente')
      this.router.navigate(['/home']);
      console.log(this.userProfile.value);
    } else {
      alert('Error al actualizar el perfil del usuario');
    }
  } else {
    let response = await this.userService.create(this.userProfile.value);
    if (response.id) {
      alert('Usuario creado correctamente')
      this.router.navigate(['/home']);
      console.log(response)
    } else {
      alert('Ha habido un error, intentalo de nuevo')
    }
  }

}
}
