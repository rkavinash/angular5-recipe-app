import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";

@Component({
    selector:'app-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent {
  
    constructor(private DSservice: DataStorageService, private recipeService: RecipeService) { }

    onSaveRecipeData() {
        this.DSservice.storeRecipes().subscribe((response: Response) => {
            console.log('success =>', response);
        })
    }

    onFetchRecipeData() {
        this.DSservice.fetchRecipes();
    }
}