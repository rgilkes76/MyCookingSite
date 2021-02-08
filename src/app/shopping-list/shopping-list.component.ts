import * as fromShoppingListReducer from './store/shopping-list.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as shoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  constructor(
    private store: Store<fromShoppingListReducer.AppState>
  ) {}

  ingredients$: Observable<fromShoppingListReducer.ShoppingListState>;

  // ingredients: Ingredient[] = [
  //   new Ingredient('Apple', 5),
  //   new Ingredient('Tomato', 10)
  // ]

  OnIngredientSelected(index: number){
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');
  }
}
