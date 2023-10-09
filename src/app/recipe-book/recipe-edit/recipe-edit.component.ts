import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../services/recipe.service";
import {Recipe} from "../model/recipe";
import {Ingredient} from "../../shared/model/ingredient";

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
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id!, this.recipeForm.value);
    } else {
      this.recipeForm.patchValue({
        id: this.recipeService.getRecipes().length + 1
      })
      console.log(this.recipeForm.value);
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.createFormGroup());
  }

  onRemoveIngredient() {
    console.log('remove ingredient');
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
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, [
        Validators.required,
        Validators.pattern(/^(http|https):\/\/[^ "]+$/),
      ]),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    });
  }

  private createFormControls(recipe?: Recipe) {
    return recipe?.ingredients.map(ingredient => this.createFormGroup(ingredient)) ?? [];
  }

  private createFormGroup(ingredient?: Ingredient) {
    return new FormGroup({
      'name': new FormControl(ingredient?.name ?? '', Validators.required),
      'amount': new FormControl(ingredient?.amount ?? '', [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }
}
