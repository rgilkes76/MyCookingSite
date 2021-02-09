import * as fromShoppingListReducer from './../store/shopping-list.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  ingredCtr = 0;

  ingredientName: string;
  amount: number;
  index = -1;
  isAdding = true;

  shoppingList$: Observable<fromShoppingListReducer.ShoppingListState>;

  constructor(private store: Store<fromShoppingListReducer.AppState>) {}

  ngOnInit(): void {
    this.shoppingList$ = this.store.select('shoppingList');

    this.shoppingList$.subscribe((state) => {
      if (state.editedIngredient == null) {
        this.ingredientName = null;
        this.amount = 0;
      } else {
        this.ingredientName = state.editedIngredient.name;
        this.amount = state.editedIngredient.amount;
      }

      this.index = state.editedIngredientIndex;
      this.isAdding = this.index < 0;
    });
  }

  OnAddOrUpdate() {
    if (this.isAdding) {
      const newIngred: Ingredient = new Ingredient(
        this.ingredientName,
        this.amount
      );

      this.onAddInternal(newIngred);
    } else {
      let ingred = new Ingredient(this.ingredientName, this.amount);

      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.index, ingredient: ingred}));
      this.store.dispatch(new ShoppingListActions.StopEdit());
      this.isAdding = true;
    }
  }

  OnDelete() {
    if (this.index < 0) return;

    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.index));
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  OnClear(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  private onAddInternal(ingred: Ingredient) {
    const ingredAction = new ShoppingListActions.AddIngredient(ingred);

    this.store.dispatch(ingredAction);
  }

  OnAddRandom() {
    const newIngred = this.CreateRandomIngredient();

    this.onAddInternal(newIngred);
  }

  private CreateRandomIngredient() {
    const ingredName = 'Ingredient ' + ++this.ingredCtr;
    const ingredAmt = this.randomInt(10);

    const newIngred = new Ingredient(ingredName, ingredAmt);
    return newIngred;
  }

  OnAddRandomN(n: number) {
    //Duplicating for now. In the end, should get ingredients from the recipe.

    let ingredients: Ingredient[] = [];

    for (let i = 0; i < n; i++) {
      const newIngred = this.CreateRandomIngredient();

      ingredients.push(newIngred);
    }

    const ingredAction = new ShoppingListActions.AddIngredients(ingredients);

    this.store.dispatch(ingredAction);
  }

  private randomInt(i: number): number {
    return Math.floor(Math.random() * Math.floor(i));
  }
}
