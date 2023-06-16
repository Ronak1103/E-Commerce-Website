import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from './data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  signUp: any;

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: signUp) {
    return this.http.post('http://localhost:3000/seller', data, { observe: 'body' }).subscribe((result: any) => {
      console.warn(result);
      if (result) {
        localStorage.setItem('seller', JSON.stringify(result));
        this.router.navigate(['seller-home']);
      }
    });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'body' })
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.length === 1) {
          this.isLoginError.emit(false);
          localStorage.setItem('seller', JSON.stringify(result));
          this.router.navigate(['seller-home']);
        } else {
          console.warn("Login failed");
          this.isLoginError.emit(true);
        }
      });
  }
}
