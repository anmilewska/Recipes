import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Store } from '@ngrx/store';
import { User } from '../user.model';
import { AuthService } from '../auth.service';


const handleAuthentication = (authData, resData) => {
    //const user = new User(authData.payload.email, resData.accessToken);
    
    localStorage.setItem('token', resData.accessToken);
    let decodedToken = jwt_decode(resData.accessToken);
    return new AuthActions.AuthenticateSucess({
        email: authData.payload.email,
        token: resData.accessToken,
        expTime: decodedToken.exp,
        redirect: true
    });
}

const handleError = (error: any) => {
    let errorMessage = 'An unknow error occured';
        if (error.error) {
            errorMessage = error.error;
            return of(new AuthActions.AuthenticateFail(errorMessage));
        }
    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<any>('http://localhost:3000/register', {
                "email": signupAction.payload.email,
                "password": signupAction.payload.password
                }) 
                .pipe(
                    map(resData => {
                        return handleAuthentication(signupAction, resData);
                }), catchError(error => {
                        return handleError(error);
                    }),
                ); 
        })
    )

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<any>('http://localhost:3000/login', {
            "email": authData.payload.email,
            "password": authData.payload.password
            })
            .pipe(
                map(resData => {
                    const expirationDuration = handleAuthentication(authData, resData).payload.expTime;
                    this.AuthService.setLogoutTimer(+expirationDuration * 1000);
                    return handleAuthentication(authData, resData);
            }),catchError(error => {
                    return handleError(error);
                }),
            );
        }),
    );

    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS), 
        tap((authSuccessAction: AuthActions.AuthenticateSucess) => {
            if (authSuccessAction.payload.redirect) {
                this.router.navigate(['/']);
            }
        })
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.AuthService.clearLogoutTimer();
            localStorage.removeItem('token');
            this.router.navigate(['/auth']);
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            let decodedToken = null;

            if(localStorage.getItem('token')) {
                const token = localStorage.getItem('token');
                decodedToken = jwt_decode(token);

                if (decodedToken) {
                    this.AuthService.setLogoutTimer(+decodedToken.exp * 1000);
                    return new AuthActions.AuthenticateSucess ({
                        email: decodedToken.email, 
                        token: token, 
                        expTime: decodedToken.exp, 
                        redirect: false
                    });
                } else {
                    return { type: 'DUMMY' };
                }
            
            // const expirationDuration =
            //   new Date(userData._tokenExpirationDate).getTime() -
            //   new Date().getTime();
            // this.autoLogout(expirationDuration);
          }
          return { type: 'DUMMY' };
        })
      );

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private router: Router,
        private AuthService: AuthService) {}

}