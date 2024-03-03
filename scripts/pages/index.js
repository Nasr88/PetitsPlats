import {dropdownUtilities} from "../utils/displayDropDown.js"
import {RecipeCard} from "../templates/RecipeCard.js" 
import {recipes} from "../recipes.js"
 
export class home{
    constructor(){
        new dropdownUtilities().displayDropDown(recipes);
        this.displayRecipes();
    }
    
    
    displayRecipes() {
        recipes.forEach(recipeData => {
            new RecipeCard(recipeData).createCard();
        });
    }
}
new home();

