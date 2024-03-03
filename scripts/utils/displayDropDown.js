import { dropdownTemplate } from "../templates/dropdown.js"

export class dropdownUtilities{

     displayDropDown(recipes){
        //add "ingrédients" dropdown
            const ingredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))];
            // Créez et ajoutez le dropdown d'ingrédients
            new dropdownTemplate("Ingrédients", "ingredients-dropdown", ingredients);
    
        //add "Appareils" dropdown
            const Appareils = [...new Set(recipes.flatMap(recipe => recipe.appliance))];
            // Créez et ajoutez le dropdown d'ingrédients
            new dropdownTemplate("Appareils", "appareils-dropdown", Appareils);
    
         //add "Appareils" dropdown
            const ustensiles = [...new Set(recipes.flatMap(recipe => recipe.ustensils))];
            // Créez et ajoutez le dropdown d'ingrédients
            new dropdownTemplate("Ustensiles", "ustensiles-dropdown", ustensiles);
    
           
        }
}
