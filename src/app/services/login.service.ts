import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  path = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) {
  }

  regeditNewUser(user: User) {
    this.http.post(this.path + '/add',
      JSON.stringify({
        username: user.username, password: user.password, email: user.email
      }))
      .subscribe();
  }

  login(user: User) {
    this.http.post(this.path + '/login', JSON.stringify(
      {username: user.username, password: user.password}),
      {observe: 'response'})
      .subscribe(value => localStorage.setItem('_token', value.headers.get('Authorization'))
      );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.path + '/show', {
      headers: new HttpHeaders({Authorization: localStorage.getItem('_token'), responseType: 'text'})
    })
      ;
  }
}
