import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(//private authService: AuthService,
    //private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }
  
  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
    });
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.HandleError());
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;


    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    
      //this.authService.login(email, password)
      // .subscribe(resData => {
      //   console.log(resData);
      //   this.isLoading = false;
      //   this.router.navigate(['/recipes']);
      // },
      // errorMessage => {
      //   this.error = errorMessage;
      //   this.showErrorAlert(errorMessage);
      //   this.isLoading = false;
      // });
    } 
    else {
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));

      // this.authService.signup(email, password).subscribe(resData => {
      //   console.log(resData);
      //   this.isLoading = false;
      // },
      // errorMessage => {
      //   this.error = errorMessage;
      //   this.showErrorAlert(errorMessage);
      //   this.isLoading = false;
      // });
    }

    form.reset();
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private showErrorAlert(errorMessage: string) {
    this.error = null;
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewwContainerRef = this.alertHost.viewContainerRef;
    hostViewwContainerRef.clear();
    const componentRef = hostViewwContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMessage;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewwContainerRef.clear();
    })
  }

}
