import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.igChangeSub = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //         this.ingredients = ingredients;
    //     }
    //   );

      //this.loggingService.printLog('Hello from shopping-list component NgOnInit!');
  }

  onEditItem(id: number) {
    //this.slService.startedEditing.next(id);
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }

  ngOnDestroy(): void {
    //this.igChangeSub.unsubscribe();
  }
  
}
