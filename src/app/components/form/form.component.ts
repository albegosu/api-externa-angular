import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  userProfile: FormGroup;
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  router = inject(Router);

  constructor(){
    this.userProfile = new FormGroup({
      first_name: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/),
        Validators.minLength(3),
      ]),
      last_name: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ]+\s[A-Za-záéíóúÁÉÍÓÚñÑ]+$/)
      ]),
      username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^.+@[^\.].*\.[a-z]{2,}$/)
      ]),
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      image: new FormControl('',
      [
        Validators.required
      ])
    }, []);
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async (params: any) => {
      // OBTENEMOS IDUSER DE LA URL
      let id: string = String(params.iduser);
      // SI HAY UN ID EN LA URL, RELLENAR EL FORM CON LOS DATOS
      if (id) {
        let response = await this.userService.getById(id)

        this.userProfile = new FormGroup({
          _id: new FormControl(response._id, []),
          first_name: new FormControl(response.first_name,
          [
            Validators.required,
            Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/),
            Validators.minLength(3),
          ]),
          last_name: new FormControl(response.last_name,
          [
            Validators.required,
            Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ]+\s[A-Za-záéíóúÁÉÍÓÚñÑ]+$/),
            Validators.minLength(3),
          ]),
          username: new FormControl(response.username,
          [
            Validators.required,
            Validators.minLength(3)
          ]),
          email: new FormControl(response.email,
          [
            Validators.required,
            Validators.pattern(/^.+@[^\.].*\.[a-z]{2,}$/)
          ]),
          password: new FormControl(response.password,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]),
          image: new FormControl(response.image,
          [
            Validators.required
          ])
        }, []);
      }
    });
  }

  async dataForm(): Promise<void> {
    // SI HAY UN ID, LLAMAMOS AL MÉTODO UPDATE Y LE PASAMOS LOS DATOS DEL FORM
    if (this.userProfile.value._id) {
      let response = await this.userService.update(this.userProfile.value)
      console.log(response);
      if (response) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al actualizar el perfil del usuario',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      // SI NO HAY ID, LLAMAMOS AL MÉTODO CREATE Y ENVIAMOS LOS DATOS DEL NUEVO USUARIO
      let response = await this.userService.create(this.userProfile.value);
      console.log(response)
      if (response.id) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario creado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ha habido un error, intentalo de nuevo',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  checkControl(formcontrolName: string, validator: string): boolean | undefined {
    return this.userProfile.get(formcontrolName)?.hasError(validator) && this.userProfile.get(formcontrolName)?.touched
  }

  onPasswordInput(event: Event) {
    const passwordControl = this.userProfile.get('password');
    if (passwordControl) {
      const passwordValue = (event.target as HTMLInputElement).value;
      passwordControl.setValue(passwordValue.substring(0, 20), { emitEvent: false });
    }
  }

}
