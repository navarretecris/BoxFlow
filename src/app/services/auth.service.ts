import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost/plataformasDesarrollo/BackEnd/crud.php';
  currentUser = new BehaviorSubject<any>(null);
  


  constructor( private http:HttpClient) { 
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser.next(JSON.parse(userData));
    }
  }

  login(username: string, password: string) {
    return this.http.post(`${this.url}`, { accion: 'login' , username, password });
  }

  setUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.next(user);
  }

  clearUser() {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
  }
  
}

``