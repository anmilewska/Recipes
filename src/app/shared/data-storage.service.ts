// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { RecipeService } from '../recipes/recipe.service';
// import { Recipe } from '../recipes/recipe.model';
// import { map, tap, take, exhaustMap } from 'rxjs/operators';
// import { AuthService } from '../auth/auth.service';
// import { Store } from '@ngrx/store';
// import * as fromApp from '../store/app.reducer';
// import * as RecipesActions from '../recipes/store/recipe.actions';

// @Injectable({providedIn: 'root'})
// export class DataStorageService {
//     constructor(private http: HttpClient, 
//     private recipeService: RecipeService,
//     private authService: AuthService,
//     private store: Store<fromApp.AppState>) {}

//     storeRecipes() {
//         const recipes = this.recipeService.getRecipes();
//         console.log(recipes);
//         this.http
//         .post('http://localhost:3000/recipes', recipes)
//             .subscribe(response => {
//                 console.log(response);
//             });
//     }

//     fetchRecipes() {
//         return this.http
//             .get<Recipe[]>('http://localhost:3000/660/recipes').pipe(
//                 map(recipes => {
//                     return recipes.map( recipe => {
//                         return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
//                     });
//                 }),
//                 tap(recipes => {
//                     //console.log(recipes);
//                     //this.recipeService.setRecipes(recipes);
//                     this.store.dispatch(new RecipesActions.SetRecipes(recipes));
//                 }))
//     }
// }