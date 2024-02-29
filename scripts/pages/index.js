import { dropdownTemplate } from "../templates/dropdown.js"
import {RecipeCard} from "../templates/RecipeCard.js" 
import {recipes} from "../recipes.js"
class home{
    constructor(){
        this.displayDropDown();
        this.displayRecipes();
    }
    
    displayDropDown(){
        
        const ingredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))];
    
        
    
        // // Récupérez le conteneur où vous voulez afficher le dropdown
         const dropdownContainer = document.getElementById("filters");
    
        // // Créez et ajoutez le dropdown d'ingrédients
        
         const dropdown = new dropdownTemplate("Ingrédients", "ingredients-dropdown", ingredients);
       
    }
    displayRecipes() {
        recipes.forEach(recipeData => {
            new RecipeCard(recipeData).createCard();
        });
    }
}
new home();

