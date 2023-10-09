import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../services/recipe.service";
import {Recipe} from "../model/recipe";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id?: number;
  editMode = false;
  recipeForm!: FormGroup

  constructor(private route: ActivatedRoute, private router: Router,
              private recipeService: RecipeService, private formBuilder: FormBuilder) {
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.recipeForm);
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients;

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe?.name ?? '';
      recipeImagePath = recipe?.imagePath ?? '';
      recipeDescription = recipe?.description ?? '';
      const ingredientControls = this.createFormControls(recipe);
      recipeIngredients = this.formBuilder.array(ingredientControls);
    } else {
      recipeIngredients = this.formBuilder.array([]);
    }
    this.recipeForm = new FormGroup({
      'id': new FormControl(this.id),
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients,
    });
  }

  private createFormControls(recipe?: Recipe) {
    return recipe?.ingredients.map(ingredient => new FormGroup({
      'name': new FormControl(ingredient.name),
      'amount': new FormControl(ingredient.amount),
    })) ?? [];
  }
}
