import {TestBed} from '@angular/core/testing';
import {DataStorageService} from './data-storage.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {RecipeService} from '../../recipe-book/services/recipe.service';

describe('DataStorageService', () => {
  let service: DataStorageService;
  let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy };
  let recipeServiceSpy: { getRecipes: jasmine.Spy, setRecipes: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    recipeServiceSpy = jasmine.createSpyObj('RecipeService', ['getRecipes', 'setRecipes']);

    TestBed.configureTestingModule({
      providers: [
        DataStorageService,
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: RecipeService, useValue: recipeServiceSpy}
      ]
    });

    service = TestBed.get(DataStorageService);
    httpClientSpy.get.and.returnValue(of(['recipe1', 'recipe2', 'recipe3']));
    httpClientSpy.put.and.returnValue(of({}));
    recipeServiceSpy.getRecipes.and.returnValue(['recipe1', 'recipe2', 'recipe3']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store recipes and handle response', () => {
    service.storeRecipes();
    expect(recipeServiceSpy.getRecipes).toHaveBeenCalled();
    expect(httpClientSpy.put).toHaveBeenCalledWith('https://learning-angular-56fa9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', ['recipe1', 'recipe2', 'recipe3']);
  });
});
