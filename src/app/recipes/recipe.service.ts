import { Recipe } from './recipe.model';
import { OnInit, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
//import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService implements OnInit {
    recipesChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe('Jakaś zapiekanka', 
    //     'Oto zapiekanka', 
    //     'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/nachos_92445_16x9.jpg',
    //     [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('Masło', 3)
    //     ]),
    
    //     new Recipe('Zupa', 
    //     'Oto zupa', 
    //     'https://static.smaker.pl/photos/4/a/8/4a8c9f6c1b9032f77e2f4400feb76a06_367255_5af7e79f2faf8_wm.jpg',
    //     [
    //         new Ingredient('Woda', 1),
    //         new Ingredient('Warzywa', 3)
    //         ]),
    
    //     new Recipe('Pierogi', 
    //     'Oto pierogi', 
    //     'https://www.mniammniam.com/obrazki/u_obrazki/n17511.jpg',
    //     [
    //         new Ingredient('Ciasto', 1),
    //         new Ingredient('Farsz', 2)
    //         ])
    //   ];

    private recipes = [];

    constructor(
        //private slService: ShoppingListService, 
                private store: Store<fromApp.AppState>) {}
    
    getRecipes() {
        return this.recipes.slice();
        
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
        //this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    ngOnInit() {
        
    }
}