import { recipes } from "../recipes.js";
import {searchBarUtility} from "../utils/searchBarUtility.js"
import {filtredRecipes} from "../pages/index.js"
export class tagSearchUtility{
 
    searchByTags = (tagsIngredients,tagsUstensils,tagsAppareils) =>{
        
        const filteredRecipes = filtredRecipes?.filter(recipe => {

            const ingredientsMatch = tagsIngredients.every(tag => recipe?.ingredients?.some(ingredient =>
                ingredient?.ingredient?.toLowerCase() === tag.toLowerCase()));

            const ustensilsMatch = tagsUstensils.every(tag => recipe?.ustensils.some(ustensil =>
                ustensil.toLowerCase() === tag.toLowerCase()));
    
            const appareilsMatch = tagsAppareils.every(tag => recipe?.appliance?.toLowerCase().includes(tag.toLowerCase()));
    
            // La recette doit correspondre à tous les onglets actifs
            return ingredientsMatch && ustensilsMatch && appareilsMatch;
        });
        
        
        new searchBarUtility().filterAndDisplayCards(filteredRecipes);
      }

}