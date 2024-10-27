import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  registerUser(user: any): Observable<any> {
    // Assuming you have an API endpoint to register a user
    return this.http.post('/api/register', user);
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get('/assets/users.json');
  }
}
