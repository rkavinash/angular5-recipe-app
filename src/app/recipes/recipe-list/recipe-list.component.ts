import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  constructor(private recipeService: RecipeService,
              private router: Router,
              private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe((r: Recipe[]) => {
      this.recipes = r;
    })
    this.recipes = this.recipeService.getRecipe();
  }

  onClickNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.currentRoute});
  }

}
