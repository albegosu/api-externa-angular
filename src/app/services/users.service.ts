import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

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

  getById(id: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${this.url}/${id}`))
  }

  delete(id: string): Promise<User> {
    return lastValueFrom(this.httpClient.delete<User>(`${this.url}/${id}`))
  }

  create(formData: any): Promise<User> {
    return lastValueFrom(this.httpClient.post<User>(this.url, formData))
  }

  update(formData: User): Promise<User> {
    return lastValueFrom(this.httpClient.put<User>(`${this.url}/${formData._id}`, formData))
  }
}
