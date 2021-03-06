import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router,
              private http: HttpClient) { }


  login(username: string, password: string) {
    this.clearToken();
    const body = `grant_type=password&username=${username}&password=${password}`;
    let headers = new HttpHeaders({
      "Content-Type":"application/x-www-form-urlencoded",
      Authorization: "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0"
    });
    let options = {headers:headers};
    return this.http.post<any>('oauth/token', body, options);
    // if(username == 'admin' && password == 'admin'){
    //   localStorage.setItem('access-token', '123');
    //   this.router.navigate(['dashboard']);
    // }
  }

  clearToken(){
    localStorage.clear();
  }

  getToken(){
    return localStorage.getItem('access-token');
  }

  // Rejestracja użytkownika
  registerUser(userData){
    return this.http.post<any>('register', userData);
  }

  // Wyloguj użytkownika
  logoutUser(){
    localStorage.removeItem('access-token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  // Sprawdzam, czy jesteśmy zalogowani
  isUserLogged(){
    return localStorage.getItem('access-token');
  }

  isPatientLogged(){
    let type = JSON.parse(localStorage.getItem('user')).type;
    if(type == 'patient')
      return true;
    return false
  }

  isDoctorLogged(){
    let type = JSON.parse(localStorage.getItem('user')).type;
    if(type == 'doctor')
      return true;
    return false
  }

  // Aktywacja użytkownika
  activateUser(id){
    return this.http.get<any>("register/"+id+"/activate");
  }

}
