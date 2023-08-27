import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient)
  private url: string = "https://peticiones.online/api/users";

  constructor() { }

  getAll(): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any>(this.url))
    .then(response => response.results);
  }

}
