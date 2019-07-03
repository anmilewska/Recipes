import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})

export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuthenticated: boolean = false;
    collapsed = false;

    constructor(//private dataStorageService: DataStorageService, 
        //private authService: AuthService
        private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
        this.userSub = this.store.select('auth')
        .pipe(map(authState => authState.user))
        .subscribe(user => {
        this.isAuthenticated = !!user;
        });
    }

    onSaveData() {
        this.store.dispatch(new RecipeActions.StoreRecipes());
        //this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
        //this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
        //this.authService.logout();
    }
    
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}