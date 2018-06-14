import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {

private recipes: Recipe[] = [
  new Recipe('Dosa', 'Tasty MTR dosa', 'https://www.vegrecipesofindia.com/wp-content/uploads/2016/05/dosa-recipe.jpg', [new Ingredient('wheat', 10), new Ingredient('rice', 5)]),
  new Recipe('Idly', 'mallige idly', 'https://1.bp.blogspot.com/-rm8CME_Cf-o/T7B0IdKWUpI/AAAAAAAAPnU/Xk9GyRnFosY/s400/idly+row.jpg', [new Ingredient('carrot', 10), new Ingredient('beans', 5)]),
  new Recipe('pani puri', 'Super kara pani puri', 'https://upload.wikimedia.org/wikipedia/commons/5/53/Panipuri%2C_Golgappa%2C_Phuchka.jpg', [new Ingredient('onion', 10), new Ingredient('potato', 5)])
];
  constructor(private slService: ShoppingListService) { }

  recipesChanged = new Subject<Recipe[]>();

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes.slice()[id];
  }

  addToSL(ing: Ingredient[]) {
    this.slService.addIngredentsToShoppingList(ing);
  }

  addNewRecipe(r: Recipe) {
    this.recipes.push(r);
    this.recipesChanged.next(this.recipes);
  }

  updateOldRecipe(i: number, r: Recipe) {
    this.recipes[i] = r;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(i: number) {
    this.recipes.splice(i, 1);
    this.recipesChanged.next(this.recipes);
  }

  setRecipe(r: Recipe[]) {
    this.recipes = r;
    this.recipesChanged.next(this.recipes);
  }
}
