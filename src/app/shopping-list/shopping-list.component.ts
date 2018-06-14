import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  shoppingSubscription: Subscription;

  constructor(private shoopingService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoopingService.getShoppingList();
    this.shoppingSubscription = this.shoopingService.ingredientsChanged.subscribe((ing: Ingredient[]) => {
      this.ingredients = ing;
    })
  } 

  ngOnDestroy() {
    this.shoppingSubscription.unsubscribe();
  }

  onEditSLItem(index: number) {
    this.shoopingService.startedEditing.next(index);
  }

}
