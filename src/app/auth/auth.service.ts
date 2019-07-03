import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
//user = new BehaviorSubject<User>(null);
private tokenExpirationTimer: any;
//const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

constructor(private store: Store<fromApp.AppState>) { }

  // signup(email: string, password: string) {
  //   return this.http.post('http://localhost:3000/register', {
  //     "email": email,
  //     "password": password
  //   })
  //   .pipe(catchError(this.handleError));
  // }

  // login(email: string, password: string) {
  //   return this.http.post('http://localhost:3000/login', {
  //     "email": email,
  //     "password": password
  //   })
  //   .pipe(catchError(this.handleError), tap((resData: any) => {
  //     this.handleAuthentication(email, resData.accessToken);
  //   }));
  // }
  
  // autoLogin() {
  //   const token = localStorage.getItem('token');
  //    if (!token) {
  //      return;
  //   }
 
  //   const decodedToken = jwt_decode(token);
  //   const loadedUser = new User(decodedToken.email, decodedToken.token, decodedToken.exp);
  //   this.store.dispatch(new AuthActions.AuthenticateSucess(loadedUser));
  //   //this.user.next(loadedUser);
  // }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    //this.user.next(null);
    //this.router.navigate(['/auth']);
    //localStorage.removeItem('token');
  }

  setLogoutTimer(expirationDuration: number) {
    let current_time = Date.now();
    let expDurationMs = expirationDuration - current_time;
    console.log(expDurationMs);
     this.tokenExpirationTimer = setTimeout(() => {
       this.store.dispatch(new AuthActions.Logout());
     }, expDurationMs)
  }

  clearLogoutTimer() {
     if (this.tokenExpirationTimer) {
       clearTimeout(this.tokenExpirationTimer);
       this.tokenExpirationTimer = null;
     }
  }


}
