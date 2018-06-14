import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-a8587.firebaseio.com/recipes.json', this.recipeService.getRecipe());
  }

  fetchRecipes() {
    this.http.get('https://ng-recipe-book-a8587.firebaseio.com/recipes.json')
      .subscribe((response: Response) => {
        const r: Recipe[] = response.json();
        this.recipeService.setRecipe(r);
      })
  }

}
