import { dropdownTemplate } from "../templates/dropdownTemplate.js"
import { tagTemplate } from "../templates/tagTemplate.js";
export class dropdownUtilities{
//pour remplir les dropdownlists a partir de recipes
     displayDropDown(recipes){
       const displayIngredientsDropdown=()=>{
        //add "ingrédients" dropdown
            const ingredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
            // Créez et ajoutez le dropdown d'ingrédients
            new dropdownTemplate("Ingrédients", "ingredients-dropdown", ingredients);
        };
        const displayAppareilsDropdown=()=>{
        //add "Appareils" dropdown
            const appareils = [...new Set(recipes.flatMap(recipe => recipe.appliance.toLowerCase()))];
            // Créez et ajoutez le dropdown d'ingrédients
            new dropdownTemplate("Appareils", "appareils-dropdown", appareils);
        };
        const displayUstensilsDropdown=()=>{
         //add "Ustensils" dropdown
            const ustensiles = [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())))];
            // Créez et ajoutez le dropdown d'ingrédients
            new dropdownTemplate("Ustensiles", "ustensiles-dropdown", ustensiles);
        };
        

         // Display all dropdowns
        displayIngredientsDropdown();
        displayAppareilsDropdown();
        displayUstensilsDropdown();
        new tagTemplate();
    }
}
