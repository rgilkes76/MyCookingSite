import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  constructor() { }

  recipes: Recipe[] = [
    new Recipe('Cheeseburger recipe', 'Delicious cheeseburger made right', 'https://images.pexels.com/photos/5920741/pexels-photo-5920741.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')
  ];

  ngOnInit(): void {
  }

}
