import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('inputName') inputNameRef: ElementRef; 
  // @ViewChild('inputAmount') inputAmountRef: ElementRef;
  @ViewChild('f') slForm:NgForm; 

  itemEdited: number;
  editMode = false;
  startedEditedSubscription: Subscription;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.startedEditedSubscription =  this.slService.startedEditing.subscribe((i: number) => {
      this.itemEdited = i;
      this.editMode = true;
      this.editedItem = this.slService.getIngredientByIndex(i);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    })
  }

  ngOnDestroy() {
    this.startedEditedSubscription.unsubscribe();
  }

  onAddIngredient(form: NgForm) {
    // const ingName = this.inputNameRef.nativeElement.value;
    // const amtName = this.inputAmountRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.itemEdited, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  deleteIngredient() {
    if(this.editMode) {
      this.slService.deleteIngredient(this.itemEdited);
      this.clearForm();
    }
  }

  clearForm() {
    this.slForm.reset();
    this.itemEdited = null;
    this.editMode = false;
  }

}
