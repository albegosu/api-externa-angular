# Api-Externa Angular

<p>
-> Consultamos la API peticiones.online y creamos la página entorno al contenido

-> **Pages:** <br>
    home (todos los usuarios que devuelve la api)<br>
    user-profile (detalle de usuario)<br>
    not-found (página para paths no existentes)<br>

-> **Components:** <br>
    navbar/footer (utilizados en todas las páginas)<br>
    form (tanto para crear como para actualizar usuarios)<br>
    user-card (componente para el renderizado en vista home de cada usuario)<br>

-> **Interface:** <br>
    User: _id, id, first_name, last_name, username, email, image, password

-> **Services:** getAll, getById, delete, create, update (CRUD completo)

-> **Desarrollo:** <br>
  
  La API externa devuelve 15 resultados, 10 por página en 2 páginas. Creamos una paginación para mostrar en Home todo los resultados.

  Desde la vista principal podemos Ver detalle, Actualizar, Borrar un usuario. Y en la Navbar y Footer, tenemos la opción de crear un Nuevo Usuario.

  El Form de actualización y creación de un usuario, contiene validaciones:<br>
    first_name: de la A a la Z, mayusc/minus, y tildes<br>
    last_name: misma que para first_name, esperando un espacio y cadena posterior (dos apellidos)<br>
    email: espera texto + @ + texto + . + al menos dos caracteres más<br>
    password: espera mínimo 6 y máximo 20 caracteres, con un contador visible 0/20 para el usuario<br>
    <br>
    Este componente es reutilizado, si en la URL tenemos un id, autocompletamente con su información los inputs y si no, se abre vacío.<br>
    <br>
    Usamos SweetAlert para dar estilos a las alertas de actualización, creado, eliminado y errores.<br>

  Mantenemos los Console Log de respuesta de la API en los métodos del CRUD para confirmar respuesta correcta.
</p>

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
